import { Button } from 'renderer/components/Button';
import { BaseGridElement } from '../BaseGridElement';
import FluxBGURL from 'renderer/assets/backgrounds/ffflux.svg';

export const AddItemGridElement = ({ onCreate }: { onCreate: () => void }) => {
  return (
    <BaseGridElement
      carouselProps={{
        images: [
          {
            alt: 'AddItemGridElement',
            src: FluxBGURL,
          },
        ],
      }}
      bodySlot={<h1>AddItemGridElement</h1>}
      bottomSlot={
        <Button color="colorless" onClick={onCreate}>
          <h1>Button</h1>
        </Button>
      }
    />
  );
};
