import { TimeoutError } from './helpers';

export const createTimeout = ({
  shouldThrow = false,
  timeoutMS,
  onTimeout,
}: {
  shouldThrow?: boolean;
  timeoutMS: number;
  onTimeout?: () => void;
}) => {
  let timeout: NodeJS.Timeout | null = null;
  const promise = new Promise<void>((resolve, reject) => {
    timeout = setTimeout(() => {
      if (shouldThrow) {
        reject(new TimeoutError(timeoutMS / 1000));
      } else {
        resolve();
      }
      timeout = null;
      onTimeout?.();
    }, timeoutMS);
  });

  return {
    promise,
    clear: () => {
      if (!timeout) return;

      clearTimeout(timeout);
      timeout = null;
    },
  };
};
