import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectOrdersByNumberFromApi,
  fetchOrderByNumberFromApi,
  selectOrdersByNumberIsLoading
} from '../../slices/orderByNumberFromApiSlice/orderByNumberFromApiSlice';
import { selectIngredients } from '../../slices/ingredientsSlice/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const isLoadingOrderByNumber = useSelector(selectOrdersByNumberIsLoading);
  const dispatch = useDispatch();
  const numberOrder = Number(useParams().number);

  useEffect(() => {
    dispatch(fetchOrderByNumberFromApi(numberOrder));
  }, []);

  const ordersData: TOrder[] = useSelector(selectOrdersByNumberFromApi);
  const orderData = ordersData.find((order) => order);
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || isLoadingOrderByNumber) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
