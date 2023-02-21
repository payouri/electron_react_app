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
          size="medium"
          color="colorless"
          active={currentNavigationEntry?.name === entryName}
          key={`${entryData.mountPoint}/${entryData.label}`}
          onClick={() => {
            if (currentNavigationEntry?.name !== entryName) goTo(entryName);
          }}
          prependIcon={entryData.icon}
        >
          {entryData.label}
        </NavigationButton>
      ))}
    </MenuContainer>
  );
};
