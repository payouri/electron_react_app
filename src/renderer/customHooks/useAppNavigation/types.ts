import { FC, ReactNode } from 'react';
import { Location } from 'react-router-dom';

export enum NavigationEntry {
  HOME = 'home',
  CARTS = 'carts',
  ITEMS = 'items',
}

export type NavigationDescriptor = {
  label: string;
  mountPoint: string;
  exactPath: boolean;
  icon: JSX.Element | FC<NavigationDescriptor>;
  name: NavigationEntry;
  subNavigation?: NavigationDescriptor[];
  sideMenu?: FC<NavigationDescriptor> | ReactNode;
} & (
  | {
      element: JSX.Element;
    }
  | {
      component: FC<NavigationDescriptor>;
    }
);

export type NavigationMap = Record<NavigationEntry, NavigationDescriptor>;

export type UseAppNavigationParams = void;

export type UseAppNavigationType = {
  navigationMap: NavigationMap;
  location: Location;
  currentNavigationEntry: NavigationDescriptor | undefined;
  goTo: (
    navigationEntry: NavigationEntry,
    preserveLocationState?: boolean
  ) => void;
};

export type UseAppNavigation = (
  params: UseAppNavigationParams
) => UseAppNavigationType;
