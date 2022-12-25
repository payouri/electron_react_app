/* eslint-disable react/jsx-props-no-spreading */
import { Route, Routes } from 'react-router-dom';
import { getNavigationEntries } from '../../helpers/getNavigationEntries';
import { NavigationRouterProps } from './types';

export const NavigationRouter = ({ navigationMap }: NavigationRouterProps) => {
  return (
    <Routes>
      {getNavigationEntries(navigationMap).map(([entryName, entryData]) => (
        <Route
          key={entryName}
          path={entryData.mountPoint}
          element={
            'element' in entryData ? (
              entryData.element
            ) : (
              <entryData.component {...entryData} name={entryName} />
            )
          }
        />
      ))}
      <Route path="*" element={<div />} />
    </Routes>
  );
};
