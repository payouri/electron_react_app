export type CustomResult<Data, ErrorMessage extends string = string> =
  | {
      hasFailed: false;
      data: Data;
    }
  | {
      hasFailed: true;
      message: ErrorMessage;
      error?: Error;
    };
