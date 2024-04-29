import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import {
  selectUserIsInit,
  selectUserProfileName,
  selectUserIsReguestLoginApi
} from '../../slices/userSlice/userSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const userIsInit = useSelector(selectUserIsInit);
  const user = useSelector(selectUserProfileName);
  const reguestLoginApi = useSelector(selectUserIsReguestLoginApi);
  const location = useLocation();

  if (!userIsInit && reguestLoginApi) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
