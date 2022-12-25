import { UseAppConfigState } from 'renderer/customHooks/useAppConfig/types';
import { UseCartsState } from 'renderer/entities/Cart/hooks/useCarts/types';
import { ItemsState } from 'renderer/entities/Item/hooks/useItems/types';

export type RootState = {
  appConfig: UseAppConfigState;
  carts: UseCartsState;
  items: ItemsState;
};
