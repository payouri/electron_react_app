export class StorageError extends Error {
    type: string;

    constructor({
        message,
        type,
    }: {
        message: string;
        type: string;
    }) {
        super(message);
        this.type = type;
    }
}