/* eslint-disable no-restricted-syntax */
import { app } from 'electron';
import { MemoryDb } from 'minimongo';
import { saveCollectionToDisk } from './persistence';

const MAX_SAVE_ATTEMPTS = 3;

const lastSavedDates = new WeakMap<object, number>();

let localDB: MemoryDb | undefined;
let isSaved = false;
let saveAttempts = 0;
let isQuiting = false;
let isSavingPromise: Promise<unknown> | null = null;

const handleWillQuit = async (event: Electron.Event): Promise<void> => {
  if (!localDB || isSaved || saveAttempts >= MAX_SAVE_ATTEMPTS) return;
  const collections = localDB.getCollectionNames();
  if (!collections.length) return;
  isQuiting = true;

  event.preventDefault();

  if (isSavingPromise) await isSavingPromise;

  try {
    await Promise.all(
      localDB.getCollectionNames().map(async (name) => {
        if (!localDB) return;
        await saveCollectionToDisk(localDB.collections[name]);
      })
    );
    isSaved = true;
  } catch (error) {
    console.error(error);
    saveAttempts += 1;
  } finally {
    app.quit();
  }
};

const periodicSave = async () => {
  if (isQuiting) return;

  const collectionNames = localDB?.getCollectionNames();

  if (collectionNames?.length) {
    isSavingPromise = Promise.allSettled(
      collectionNames.map(async (collectionName) => {
        if (!localDB) return;
        const collection = localDB.collections[collectionName];
        if (
          // Date.now() - (lastSavedDates.get(collection) ?? 0) < 5 * 60 * 1000 ||
          Object.keys(collection.upserts).length === 0 &&
          Object.keys(collection.removes).length === 0
        ) {
          return;
        }

        await saveCollectionToDisk(collection);
        collection.upserts = {};
        collection.removes = {};
        lastSavedDates.set(collection, Date.now());
      })
    );

    await isSavingPromise;

    isSavingPromise = null;
  }
};

const createLocalDb = () => {
  const db = new MemoryDb();
  setInterval(periodicSave, 10 * 1000);
  return db;
};

export const getLocalDb = () => {
  if (!localDB) {
    localDB = createLocalDb();
  }
  return localDB;
};

app.on('will-quit', handleWillQuit);
