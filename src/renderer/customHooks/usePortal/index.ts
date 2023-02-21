import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const usePortal = ({
  id,
  mountNode = document.body,
  children,
}: {
  id: string;
  mountNode?: HTMLElement;
  children: React.ReactNode;
}) => {
  const el = useRef(document.createElement('div'));
  if (el.current && el.current.id !== id) el.current.id = id;

  useEffect(() => {
    const { current: element } = el;

    mountNode.appendChild(element);
    return () => {
      mountNode.removeChild(element);
    };
  }, [mountNode]);

  if (!el.current) return null;
  return createPortal(children, el.current, id);
};
