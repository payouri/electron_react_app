import { MenuContainer, NavigationButton } from './styles';
import { NavigationMenuProps } from './types';

export const NavigationMenu = ({
  currentNavigationEntry,
  goTo,
  location,
  navigationEntries,
}: NavigationMenuProps) => {
  return (
    <MenuContainer>
      {navigationEntries.map(([entryName, entryData]) => (
        <NavigationButton
          color="colorless"
          active={currentNavigationEntry?.mountPoint === entryData.mountPoint}
          key={`${entryData.mountPoint}/${entryData.label}`}
          onClick={() => {
            if (location.pathname !== entryData.mountPoint) goTo(entryName);
          }}
          prependIcon={entryData.icon}
        >
          {entryData.label}
        </NavigationButton>
      ))}
    </MenuContainer>
  );
};
