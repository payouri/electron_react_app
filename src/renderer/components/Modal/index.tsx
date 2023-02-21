/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { useKeyPress } from 'renderer/customHooks/useKeyPress';
import styled from 'styled-components';

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

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.grayscale[150]};
  border-radius: ${({ theme }) => theme.gap[4]};
  box-shadow: ${({ theme }) => theme.boxShadow.elevation[1]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[8]};
  padding: ${({ theme }) => theme.gap[8]};
  width: 100%;
  max-width: 600px;
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
  height: 24px;
  width: 24px;
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
};

export const Modal = ({
  children,
  onClose,
  title,
  open,
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
