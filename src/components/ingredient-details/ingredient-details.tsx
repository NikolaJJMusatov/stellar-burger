import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../slices/ingredientsSlice/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const allIngredients = useSelector(selectIngredients);
  const params = useParams();
  const current = params.id;

  const ingredientData = allIngredients.find(
    (ingredient) => ingredient._id === current
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
