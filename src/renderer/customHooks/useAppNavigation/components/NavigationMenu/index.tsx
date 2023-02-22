import { useMemo } from 'react';
import { MenuContainer } from './components/MenuContainer';
import {
  NavigationButton,
  NavigationContainer,
  SideMenuContainer,
} from './styles';
import { NavigationMenuProps } from './types';

export const NavigationMenu = ({
  currentNavigationEntry,
  goTo,
  location,
  navigationEntries,
}: NavigationMenuProps) => {
  const SideMenu = useMemo(
    () => currentNavigationEntry?.sideMenu,
    [currentNavigationEntry?.name, currentNavigationEntry?.mountPoint]
  );

  const mode = SideMenu ? 'compact' : 'normal';

  return (
    <NavigationContainer mode={mode}>
      <MenuContainer mode={mode}>
        {navigationEntries.map(([entryName, entryData]) => (
          <NavigationButton
            size="medium"
            color="colorless"
            active={currentNavigationEntry?.name === entryName}
            key={`${entryData.mountPoint}/${entryData.label}`}
            onClick={() => {
              if (currentNavigationEntry?.name !== entryName) goTo(entryName);
            }}
            prependIcon={
              typeof entryData.icon === 'function'
                ? entryData.icon(entryData)
                : entryData.icon
            }
          >
            {mode === 'normal' ? entryData.label : null}
          </NavigationButton>
        ))}
      </MenuContainer>
      {SideMenu && (
        <SideMenuContainer>
          {typeof SideMenu === 'function'
            ? currentNavigationEntry && <SideMenu {...currentNavigationEntry} />
            : SideMenu}
        </SideMenuContainer>
      )}
    </NavigationContainer>
  );
};
