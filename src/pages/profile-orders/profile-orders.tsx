import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectHistoryOrdersUser,
  selectRequestToApiOrdersUser,
  fetchGetOrdersApiUser
} from '../../slices/ordersUserSlice/ordersUserSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectHistoryOrdersUser);
  const requestToApiOrdersUser = useSelector(selectRequestToApiOrdersUser);

  useEffect(() => {
    dispatch(fetchGetOrdersApiUser());
  }, []);

  if (requestToApiOrdersUser) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
