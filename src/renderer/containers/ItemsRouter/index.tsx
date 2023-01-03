/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Button } from 'renderer/components/Button';
import {
  NavigationDescriptor,
  NavigationEntry,
} from 'renderer/customHooks/useAppNavigation/types';
import { useItems } from 'renderer/entities/Item/hooks/useItems';
import { MessageType, sendMessage } from 'renderer/services';
import { ItemGrid } from './components/ItemGrid';
import { MainItemsContainer } from './styles';

export const ItemsRouter = ({
  label,
  mountPoint,
  name,
}: {
  name: NavigationEntry;
} & NavigationDescriptor) => {
  const { loading, items, hasMore, loadMore, start } = useItems();
  const location = useLocation();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [createItemURL, setCreateItemURL] = useState<string>('');
  const { itemId } = useParams<{ itemId?: string }>();

  console.log('ItemsRouter', items);
  console.log('location', location);
  console.log(name, itemId);
  const navigate = useNavigate();

  const handleOnCreateItem = () => {
    if (!isCreating) {
      setIsCreating(true);
    }
  };

  const handleSubmit = () => {
    sendMessage({
      type: MessageType.OPEN_BROWSER,
      payload: {
        url: createItemURL,
        scriptsToRun: ['element_picker'],
      },
    });
  };

  useEffect(() => {
    if (!itemId) {
      navigate(`${mountPoint.replace('/*', '')}/all`);
      console.log('no itemId', location);
    }
  }, []);

  useEffect(() => {
    if (!isCreating && createItemURL) {
      setCreateItemURL('');
    }
  }, [isCreating]);

  return (
    <MainItemsContainer>
      <h1>{label}</h1>
      {isCreating && (
        <div>
          <input
            type="url"
            value={createItemURL}
            onChange={(event) => {
              setCreateItemURL(event.target.value);
            }}
          />
          <Button color="colorless" onClick={handleSubmit}>
            0
          </Button>
        </div>
      )}
      <Routes>
        <Route
          index
          element={
            <ItemGrid
              items={items}
              loading={loading}
              loadMore={loadMore}
              onCreateItem={handleOnCreateItem}
            />
          }
        />
        <Route
          path="/create"
          element={
            <div>
              <h1>{label}</h1>
            </div>
          }
        />
        <Route
          path="/all"
          element={
            <ItemGrid
              items={items}
              loading={loading}
              loadMore={loadMore}
              onCreateItem={handleOnCreateItem}
            />
          }
        />
      </Routes>
    </MainItemsContainer>
  );
};
