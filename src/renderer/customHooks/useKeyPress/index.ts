import { useEffect, useState } from 'react';

export const useKeyPress = ({
  key,
  withinNode = document.body,
}: {
  key: string;
  withinNode?: HTMLElement;
}) => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) {
        setKeyPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === key) {
        setKeyPressed(false);
      }
    };

    withinNode.addEventListener('keydown', handleKeyDown);
    withinNode.addEventListener('keyup', handleKeyUp);

    return () => {
      withinNode.removeEventListener('keydown', handleKeyDown);
      withinNode.removeEventListener('keyup', handleKeyUp);
    };
  }, [key, withinNode]);

  return keyPressed;
};
