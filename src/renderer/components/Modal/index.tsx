/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { useKeyPress } from '../../customHooks/useKeyPress';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.elevationLevel[7]};
`;

const ModalContainer = styled.div<{
  height: CSSProperties['height'];
  maxHeight: CSSProperties['maxHeight'];
  width: CSSProperties['width'];
  maxWidth: CSSProperties['maxWidth'];
}>`
  background-color: ${({ theme }) => theme.grayscale[150]};
  border-radius: ${({ theme }) => theme.gap[4]};
  box-shadow: ${({ theme }) => theme.boxShadow.elevation[1]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[8]};
  padding: ${({ theme }) => theme.gap[8]};
  width: ${({ width }) => width};
  max-width: ${({ maxWidth }) => maxWidth};
  height: ${({ height }) => height};
  max-height: ${({ maxHeight }) => maxHeight};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ModalTitle = styled.h1`
  /* font-size: ${({ theme }) => theme.gap[1]}; */
  font-weight: 600;
  color: ${({ theme }) => theme.grayscale[20]};
`;

const ModalCloseButton = styled.button`
  background-color: ${({ theme }) => theme.grayscale[150]};
  border: 2px solid transparent;
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: background-color 0.2s ease-in-out;
  font-size: ${({ theme }) => theme.gap[16]};
  &:hover {
    background-color: ${({ theme }) => theme.grayscale[100]};
  }
  box-shadow: ${({ theme }) => theme.boxShadow.elevation[4]};
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[8]};
`;

export type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  open: boolean;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  maxWidth?: CSSProperties['maxWidth'];
  maxHeight?: CSSProperties['maxHeight'];
};

export const Modal = ({
  children,
  onClose,
  title,
  open,
  height = 'auto',
  maxHeight = 'unset',
  width = '100%',
  maxWidth = '600px',
  ...props
}: ModalProps) => {
  const [hasFocus, setHasFocus] = useState(false);
  const EscapeKeyPressed = useKeyPress({
    key: 'Escape',
  });
  const handleFocus = (event: 'focus' | 'blur') => {
    if (event === 'focus') {
      setHasFocus(true);
    } else {
      setHasFocus(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    if (hasFocus && EscapeKeyPressed) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFocus, open, EscapeKeyPressed]);

  if (!open) return null;

  return (
    <ModalWrapper
      {...props}
      tabIndex={0}
      onFocus={() => {
        handleFocus('focus');
      }}
      onBlur={() => {
        handleFocus('blur');
      }}
      onClick={onClose}
    >
      <ModalContainer
        height={height}
        maxHeight={maxHeight}
        width={width}
        maxWidth={maxWidth}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </ModalWrapper>
  );
};
