/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Modal } from 'renderer/components/Modal';
import {
  NavigationDescriptor,
  NavigationEntry,
} from 'renderer/customHooks/useAppNavigation/types';
import { usePortal } from 'renderer/customHooks/usePortal';
import { useCarts } from 'renderer/entities/Cart/hooks/useCarts';
import { CreateCartForm } from './components/CreateCartForm';
import { CartGrid } from './components/CartGrid';
import { MainCartsContainer } from './styles';
import { PageHeader } from 'renderer/components/PageHeader';

export const CartsRouter = ({
  label,
  mountPoint,
  name,
}: {
  name: NavigationEntry;
} & NavigationDescriptor) => {
  const { loading, carts, loadMore, createCart } = useCarts();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const { itemId } = useParams<{ itemId?: string }>();
  const navigate = useNavigate();

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
        <CreateCartForm
          onSubmit={async (data) => {
            console.log(await createCart(data.name));
            setIsCreating(false);
          }}
        />
      </Modal>
    ),
    mountNode: document.body,
  });

  const handleCreateCart = () => {
    setIsCreating(true);
  };

  useEffect(() => {
    if (!itemId) {
      navigate(`${mountPoint.replace('/*', '')}/all`);
    }
  }, []);

  return (
    <MainCartsContainer>
      <PageHeader
        actionsPosition="right"
        title={label}
        actionJustification="space-between"
      />
      <Routes>
        <Route
          path="/:itemId"
          element={
            <div>
              <h1>{label}</h1>
              qsmdlkqslmdk
            </div>
          }
        />
        <Route
          path="/all"
          element={
            <CartGrid
              items={carts}
              loading={loading}
              loadMore={loadMore}
              onCreateCart={handleCreateCart}
            />
          }
        />
        <Route
          index
          element={
            <CartGrid
              items={carts}
              loading={loading}
              loadMore={loadMore}
              onCreateCart={handleCreateCart}
            />
          }
        />
      </Routes>
      {CreateItemModal}
    </MainCartsContainer>
  );
};
