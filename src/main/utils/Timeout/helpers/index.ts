export class TimeoutError extends Error {
  constructor(timeoutInSeconds: number) {
    super(`Timeout of ${timeoutInSeconds} seconds elapsed`);
  }
}
