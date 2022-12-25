import { LoaderContainer, LoadingIndicator } from './styles';
import { LoaderProps } from './types';

export const Loader = ({ size, color, fillSpace }: LoaderProps) => {
  return (
    <LoaderContainer fillSpace={fillSpace}>
      <LoadingIndicator color={color} size={size} />
    </LoaderContainer>
  );
};
