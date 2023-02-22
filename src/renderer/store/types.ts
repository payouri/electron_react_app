import { CartSelectorState } from 'renderer/containers/CartSelector/types';
import { UseAppConfigState } from 'renderer/customHooks/useAppConfig/types';
import { UseTransitionOrchestratorState } from 'renderer/customHooks/useTransitionOrchestrator/types';
import { UseCartsState } from 'renderer/entities/Cart/hooks/useCarts/types';
import { ItemsState } from 'renderer/entities/Item/hooks/useItems/types';

export type RootState = {
  cartSelector: CartSelectorState;
  appConfig: UseAppConfigState;
  carts: UseCartsState;
  items: ItemsState;
  transitions: UseTransitionOrchestratorState;
};
