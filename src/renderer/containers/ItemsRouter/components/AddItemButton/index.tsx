import { Button } from 'renderer/components/Button';
import { Icon, IconSize } from 'renderer/components/Icon';

export const AddItemButton = ({ onCreate }: { onCreate: () => void }) => {
  return (
    <Button
      color="colorless"
      size="medium"
      prependIcon={<Icon name="plus" size={IconSize.MEDIUM} />}
      onClick={onCreate}
    >
      Add a new Item
    </Button>
  );
};
