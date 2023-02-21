import { Button } from 'renderer/components/Button';
import { BaseGridElement } from '../BaseGridElement';
import FluxBGURL from 'renderer/assets/backgrounds/ffflux.svg';

export const AddCartGridElement = ({ onCreate }: { onCreate: () => void }) => {
  return (
    <BaseGridElement
      carouselProps={{
        images: [
          {
            alt: 'AddCartGridElement',
            src: FluxBGURL,
          },
        ],
      }}
      bodySlot={<h1>AddCartGridElement</h1>}
      bottomSlot={
        <Button color="colorless" onClick={onCreate}>
          <h1>Button</h1>
        </Button>
      }
    />
  );
};
