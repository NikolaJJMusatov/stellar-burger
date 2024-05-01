import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import {
  selectAllOrdersFromApi,
  selectAllOrdersFromApiTotal,
  selectAllOrdersFromApiTotalToday
} from '../../slices/allOrdersFromApiSlice/allOrdersFromApiSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(selectAllOrdersFromApi);
  const feed = {
    total: useSelector(selectAllOrdersFromApiTotal),
    totalToday: useSelector(selectAllOrdersFromApiTotalToday)
  };

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
