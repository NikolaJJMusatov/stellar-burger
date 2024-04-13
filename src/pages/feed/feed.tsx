import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  fetchAllOrdersFromApi,
  selectAllOrdersFromApi
} from '../../slices/allOrdersFromApiSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectAllOrdersFromApi);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrdersFromApi());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchAllOrdersFromApi());
      }}
    />
  );
};
