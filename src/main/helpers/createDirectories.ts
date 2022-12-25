import { access, mkdir, readdir } from 'fs/promises';

export const createDirectories = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    await readdir(path);
    return true;
  } catch {
    try {
      await mkdir(path, { recursive: true });
      return true;
    } catch {
      return false;
    }
  }
};
