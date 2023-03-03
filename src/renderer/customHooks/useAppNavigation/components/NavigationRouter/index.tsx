/* eslint-disable react/jsx-props-no-spreading */
import { Route, Routes } from 'react-router-dom';
import { getNavigationEntries } from '../../helpers/getNavigationEntries';
import { RoutesContainer } from './styles';
import { NavigationRouterProps } from './types';

export const NavigationRouter = ({ navigationMap }: NavigationRouterProps) => {
  return (
    <RoutesContainer>
      <Routes>
        {/* Map navigation entries to routes */}
        {getNavigationEntries(navigationMap).map(([entryName, entryData]) => (
          <Route
            key={entryName}
            path={entryData.mountPoint}
            element={
              // If the entry has an element, use it
              'element' in entryData ? (
                entryData.element
              ) : (
                // Otherwise, render a component
                <entryData.component {...entryData} name={entryName} />
              )
            }
          />
        ))}
        {/* Fallback route */}
        <Route path="*" element={<div />} />
      </Routes>
    </RoutesContainer>
  );
};
