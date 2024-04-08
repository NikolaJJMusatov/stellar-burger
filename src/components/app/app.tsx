import {
  ConstructorPage,
  Feed,
  NotFound404,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import {
  AppHeader,
  Modal,
  OrderInfo,
  IngredientDetails
} from '@components';
import '../../index.css';
import styles from './app.module.css';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import {
	Routes,
	Route,
  useLocation,
  useNavigate
} from 'react-router-dom';




const App = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const background = currentLocation.state?.background;


  const handleClose = () => {
    navigate(-1)
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);


  return (
  
    <div className={styles.app}>
      <AppHeader />
        <Routes location={background || currentLocation}>
          <Route path='/' element={<ConstructorPage/>} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/feed' element={<Feed/>} />    
          <Route path='/feed/:number' element = {<OrderInfo />} />


          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />

          <Route path='*' element={<NotFound404/>} />
        </Routes>

        
        {background && (
          <Routes>
              <Route path='/feed/:number' element={
                <Modal title={'Информация о заказе'} onClose={handleClose} >
                  <OrderInfo />
                </Modal>}
              />
              <Route path='/ingredients/:id' element={
                <Modal title={'Детали ингредиента'} onClose={handleClose} >
                  <IngredientDetails />
                </Modal>}
              />
              <Route path='/profile/orders/:number' element={
                <Modal title={'Инф о заказе'} onClose={handleClose} >
                  <OrderInfo />
                </Modal>}
              />
          </Routes>
          )
        }

    </div>
  )
};

export default App;

