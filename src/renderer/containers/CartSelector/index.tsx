import { Cart } from 'main/entities/Cart/Cart.types';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import Select from 'renderer/components/Select';
import { useCarts } from 'renderer/entities/Cart/hooks/useCarts';
import { selectCartSelectorState } from './selectors';
import { actions, key, reducer } from './slice';

export type CartSelectorProps = {
  onChange: (cartId?: Cart) => void;
  initialValue?: string;
};

export const CartSelector = ({ onChange, initialValue }: CartSelectorProps) => {
  useInjectReducer({
    key,
    reducer,
  });
  const { carts, loading, loadMore, getCart } = useCarts();
  const options = useMemo(
    () =>
      carts.map((cart) => ({
        label: cart.name,
        value: cart._id,
      })),
    [JSON.stringify(carts)]
  );
  const { selectedCart } = useSelector(selectCartSelectorState);
  const dispatch = useDispatch();

  const handleValueChange = (option: { label: string; value: string }) => {
    dispatch(actions.setSelectedCart(option.value));
  };

  const getCartOnChange = async (cartId: string) => {
    console.log('cartData', cartId);
    let cartData = carts.find((cart) => cart._id === cartId) || null;

    if (!cartData) {
      cartData = await getCart(cartId);
    }

    onChange(cartData || undefined);
    return cartData;
  };

  useEffect(() => {
    if (initialValue) {
      dispatch(actions.setSelectedCart(initialValue));
    } else if (selectedCart) {
      getCartOnChange(selectedCart);
    }
  }, []);

  useEffect(() => {
    if (selectedCart) {
      getCartOnChange(selectedCart);
    } else {
      onChange(undefined);
    }
  }, [selectedCart]);

  return (
    <Select
      value={selectedCart}
      options={options}
      onChange={handleValueChange}
    />
  );
};
