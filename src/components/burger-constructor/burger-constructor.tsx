import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectBurgerConstructorState,
  clearBurgerConstructor
} from '../../slices/burgerConstructoSlice/burgerConstructoSlice';
import { useNavigate } from 'react-router-dom';
import {
  selectOrderRequest,
  fetchOrderUser,
  selectOrderUser,
  clearOrderUser
} from '../../slices/ordersUserSlice/ordersUserSlice';
import { selectUserIsInit } from '../../slices/userSlice/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItemsFromStore = useSelector(
    selectBurgerConstructorState
  ).constructorItems;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderRequest = useSelector(selectOrderRequest);
  const userInit = useSelector(selectUserIsInit);
  const orderModalData = useSelector(selectOrderUser);

  const onOrderClick = () => {
    if (!constructorItemsFromStore.bun || orderRequest) {
      return;
    }

    if (!userInit) {
      navigate('/login');
      return;
    }

    const order: string[] = [
      constructorItemsFromStore.bun!._id,
      ...constructorItemsFromStore.ingredients.map(
        (ingredient) => ingredient._id
      ),
      constructorItemsFromStore.bun!._id
    ];

    dispatch(fetchOrderUser(order));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderUser());
    dispatch(clearBurgerConstructor());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItemsFromStore.bun
        ? constructorItemsFromStore.bun.price * 2
        : 0) +
      constructorItemsFromStore.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItemsFromStore]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItemsFromStore}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
