import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUserProfileName } from '../../slices/userSlice';

export const AppHeader: FC = () => {
  const userProfileName = useSelector(selectUserProfileName);

  return <AppHeaderUI userName={userProfileName} />;
};
