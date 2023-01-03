import { Button } from 'renderer/components/Button';

export const AddItemGridElement = ({ onCreate }: { onCreate: () => void }) => {
  return (
    <div>
      <h1>AddItemGridElement</h1>
      <Button color="colorless" onClick={onCreate}>
        <h1>Button</h1>
      </Button>
    </div>
  );
};
