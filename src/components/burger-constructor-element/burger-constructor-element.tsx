import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  removeIngredientFromBurger,
  moveUpIngredientInBurger,
  moveDownIngredientInBurger
} from '../../slices/burgerConstructoSlice/burgerConstructoSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveDownIngredientInBurger(index));
    };

    const handleMoveUp = () => {
      dispatch(moveUpIngredientInBurger(index));
    };

    const handleClose = () => {
      dispatch(removeIngredientFromBurger(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
