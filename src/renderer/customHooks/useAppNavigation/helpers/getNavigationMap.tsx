import { Icon } from 'renderer/components/Icon';
import { IconSize } from 'renderer/components/Icon/types';
import { CartsRouter } from 'renderer/containers/CartsRouter';
import { ItemsRouter } from 'renderer/containers/ItemsRouter';
import { NavigationEntry, NavigationMap } from '../types';

export const getNavigationMap = (): NavigationMap => ({
  [NavigationEntry.HOME]: {
    label: 'Home',
    mountPoint: '/',
    exactPath: true,
    icon: <Icon name="home" size={IconSize.LARGE} />,
    component: () => <div>Home</div>,
  },
  [NavigationEntry.CARTS]: {
    label: 'My Carts',
    mountPoint: '/carts/*',
    exactPath: false,
    icon: <Icon name="cart" size={IconSize.LARGE} />,
    component: CartsRouter,
  },
  [NavigationEntry.ITEMS]: {
    label: 'Saved Items',
    mountPoint: '/items/*',
    exactPath: false,
    icon: <Icon name="items" size={IconSize.LARGE} />,
    component: ItemsRouter,
  },
});
