import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { selectBurgerConstructorState } from '../../slices/burgerConstructoSlice';


export const BurgerConstructor: FC = () => {

  const constructorItemsFromStore = useSelector(selectBurgerConstructorState).constructorItems;

  /** TODO: взять переменные orderRequest и orderModalData из стора */
 
  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItemsFromStore.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItemsFromStore.bun ? constructorItemsFromStore.bun.price * 2 : 0) +
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
