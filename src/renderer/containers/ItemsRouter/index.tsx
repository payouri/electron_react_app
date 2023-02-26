/* eslint-disable react-hooks/exhaustive-deps */
import { Item } from 'main/entities/Item/Item.types';
import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Modal } from 'renderer/components/Modal';
import { PageHeader } from 'renderer/components/PageHeader';
import { Search } from 'renderer/components/Search';
import {
  NavigationDescriptor,
  NavigationEntry,
} from 'renderer/customHooks/useAppNavigation/types';
import { usePortal } from 'renderer/customHooks/usePortal';
import { useTransitionOrchestrator } from 'renderer/customHooks/useTransitionOrchestrator';
import { useCarts } from 'renderer/entities/Cart/hooks/useCarts';
import { useItems } from 'renderer/entities/Item/hooks/useItems';
import { MessageType, sendMessage } from 'renderer/services';
import { AddItemButton } from './components/AddItemButton';
import { ItemForm } from './components/ItemForm';
import { ItemGrid } from './components/ItemGrid';
import { HeaderActions } from './components/ItemGrid/styles';
import { MainItemsContainer } from './styles';

export const ItemsRouter = ({
  label,
  mountPoint,
}: {
  name: NavigationEntry;
} & NavigationDescriptor) => {
  const { loading, items, hasMore, loadMore, start, createItem, updateItem } =
    useItems();
  const { addItemsToCart, carts } = useCarts();
  const location = useLocation();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<
    { isEditing: false } | { isEditing: true; item: Item }
  >({
    isEditing: false,
  });
  const [createItemURL, setCreateItemURL] = useState<string>('');
  const { itemId } = useParams<{ itemId?: string }>();
  const { updateElementStyle, resetElementStyle } = useTransitionOrchestrator({
    defaultTransition: 'all 400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
  });

  const CreateItemModal = usePortal({
    id: 'create-item-modal',
    children: (
      <Modal
        open={isCreating}
        onClose={() => {
          setIsCreating(false);
        }}
        title="Create Item"
      >
        <ItemForm
          onSubmit={async (data) => {
            console.log(await createItem(data));
            setIsCreating(false);
          }}
        />
      </Modal>
    ),
    mountNode: document.body,
  });

  const EditItemModal = usePortal({
    id: 'edit-item-modal',
    children: (
      <Modal
        open={isEditing.isEditing}
        onClose={() => {
          setIsEditing({
            isEditing: false,
          });
        }}
        title="Edit Item"
      >
        <ItemForm
          item={isEditing.isEditing ? isEditing.item : undefined}
          onSubmit={async (data) => {
            if (!isEditing.isEditing) return;

            const { _id } = isEditing.item;

            await updateItem({
              _id,
              ...data,
            });

            setIsEditing({
              isEditing: false,
            });
          }}
        />
      </Modal>
    ),
    mountNode: document.body,
  });

  const navigate = useNavigate();

  const handleOnCreateItem = () => {
    if (!isCreating) {
      setIsCreating(true);
    }
  };

  const handleOnEditItem = (item: Item) => {
    setIsEditing({
      isEditing: true,
      item,
    });
  };

  const handleAddToCart = async (cartId: string, item: Item) => {
    console.log({
      cartId,
      item,
    });
    await addItemsToCart(cartId, [item]);
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
    if (isCreating) {
      updateElementStyle('main-container', {
        transform: 'scale(1.2)',
        filter: 'blur(10px)',
      });
    } else {
      resetElementStyle('main-container');
    }
  }, [isCreating]);

  return (
    <MainItemsContainer>
      <PageHeader
        actionsPosition="right"
        title={label}
        actionJustification="space-between"
        actions={
          <HeaderActions block justify="space-between">
            <Search
              onSearch={(searchTerm) => {
                console.log(searchTerm);
              }}
            />
            <AddItemButton onCreate={handleOnCreateItem} />
          </HeaderActions>
        }
      />
      {/* {isCreating && (
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
      )} */}
      <Routes>
        <Route
          path="/all"
          element={
            <ItemGrid
              items={items}
              loading={loading}
              loadMore={loadMore}
              onEditItem={handleOnEditItem}
              onAddToCart={handleAddToCart}
            />
          }
        />
        <Route path="/:itemId" element={<div />} />
        <Route
          index
          element={
            <ItemGrid
              items={items}
              loading={loading}
              loadMore={loadMore}
              onEditItem={handleOnEditItem}
              onAddToCart={handleAddToCart}
            />
          }
        />
      </Routes>
      {CreateItemModal}
      {EditItemModal}
    </MainItemsContainer>
  );
};
