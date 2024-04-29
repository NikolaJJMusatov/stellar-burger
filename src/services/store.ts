import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice/ingredientsSlice';
import burgerConstructorReducer from '../slices/burgerConstructoSlice/burgerConstructoSlice';
import allOrdersFromApiReducer from '../slices/allOrdersFromApiSlice/allOrdersFromApiSlice';
import orderByNumberFromApiReducer from '../slices/orderByNumberFromApiSlice/orderByNumberFromApiSlice';
import userSliceReducer from '../slices/userSlice/userSlice';
import ordersUserSliceReducer from '../slices/ordersUserSlice/ordersUserSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  allOrdersFromApi: allOrdersFromApiReducer,
  orderByNumberFromApi: orderByNumberFromApiReducer,
  user: userSliceReducer,
  ordersUser: ordersUserSliceReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
