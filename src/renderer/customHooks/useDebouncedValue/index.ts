import { useEffect, useRef, useState } from 'react';

export const useDebouncedValue = <T>(
  value: T,
  delayMS: number,
  maxWaitMS?: number
): [
  T,
  {
    cancel: () => void;
    setDebouncedValue: (value: T) => void;
  }
] => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMS);

    if (maxWaitMS) {
      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(value);
      }, maxWaitMS);
    }
  }, [value, delayMS, maxWaitMS]);

  const cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return [
    debouncedValue,
    {
      cancel,
      setDebouncedValue,
    },
  ];
};
