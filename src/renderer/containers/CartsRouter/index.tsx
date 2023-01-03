/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  NavigationDescriptor,
  NavigationEntry,
} from 'renderer/customHooks/useAppNavigation/types';
import { useCarts } from 'renderer/entities/Cart/hooks/useCarts';

export const CartsRouter = ({
  label,
  mountPoint,
  name,
}: {
  name: NavigationEntry;
} & NavigationDescriptor) => {
  const { loading, carts } = useCarts();
  const location = useLocation();
  const { itemId } = useParams<{ itemId?: string }>();

  console.log('CartsRouter', carts);
  console.log('location', location);
  console.log(name, itemId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!itemId) {
      navigate(`${mountPoint}/all`);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/create"
        element={
          <div>
            <h1>{label}</h1>
            qsmdlkqslmdk qlmdkqmlsdkq
          </div>
        }
      />
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
        index
        element={
          <div>
            <h1>{label}</h1>
          </div>
        }
      />
    </Routes>
  );
};
