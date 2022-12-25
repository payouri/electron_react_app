import { StorageError } from '../errors';

export class DBStorageNameAlreadyTaken extends StorageError {
  static type = 'DBStorageNameAlreadyTaken';

  public type = DBStorageNameAlreadyTaken.type;

  constructor(name: string) {
    super({
      type: 'DBStorageNameAlreadyTaken',
      message: `DBStorageNameAlreadyTaken: ${name}`,
    });
  }
}
