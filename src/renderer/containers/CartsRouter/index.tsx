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
  const { cartId } = useParams<{ cartId?: string }>();

  console.log('CartsRouter', carts);
  console.log('location', location);
  console.log(name, cartId);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('CartsRouter useEffect');
  }, []);

  return (
    <Routes>
      <Route
        index
        element={
          <div>
            <h1>{label}</h1>
            qsmdlkqslmdk qlmdkqmlsdkq
          </div>
        }
      />
      <Route
        path="/:cartId"
        element={
          <div>
            <h1>{label}</h1>
            qsmdlkqslmdk
          </div>
        }
      />
      <Route
        path="*"
        element={
          <div>
            <h1>{label}</h1>
          </div>
        }
      />
    </Routes>
  );
};
