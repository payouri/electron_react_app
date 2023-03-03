import { BrowserForm } from '../../../components/BrowserForm';
import { Icon } from '../../../components/Icon';
import { IconSize } from '../../../components/Icon/types';
import { CartsRouter } from '../../../containers/CartsRouter';
import { ItemsRouter } from '../../../containers/ItemsRouter';
import { NavigationDescriptor, NavigationEntry, NavigationMap } from '../types';

const getHomeNavigationEntry = (): NavigationDescriptor => ({
  label: 'Home',
  mountPoint: '/',
  exactPath: true,
  icon: <Icon name="home" size={IconSize.MEDIUM} />,
  component: () => (
    <div>
      Home
      <BrowserForm />
    </div>
  ),
  name: NavigationEntry.HOME,
});

const getCartsNavigationEntry = (): NavigationDescriptor => ({
  label: 'My Carts',
  mountPoint: '/carts/*',
  exactPath: false,
  icon: <Icon name="cart" size={IconSize.MEDIUM} />,
  component: CartsRouter,
  name: NavigationEntry.CARTS,
  sideMenu: () => <div>Filters</div>,
});

const getItemsNavigationEntry = (): NavigationDescriptor => ({
  label: 'Saved Items',
  mountPoint: '/items/*',
  exactPath: false,
  icon: <Icon name="items" size={IconSize.MEDIUM} />,
  component: ItemsRouter,
  name: NavigationEntry.ITEMS,
  sideMenu: () => <div>Filters</div>,
});

export const getNavigationMap = (): NavigationMap => ({
  [NavigationEntry.HOME]: getHomeNavigationEntry(),
  [NavigationEntry.CARTS]: getCartsNavigationEntry(),
  [NavigationEntry.ITEMS]: getItemsNavigationEntry(),
});
