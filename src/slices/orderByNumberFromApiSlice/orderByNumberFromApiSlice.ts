import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

interface IOrderByNumberFromApiState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | undefined;
}

export const fetchOrderByNumberFromApi = createAsyncThunk(
  'orderByNumberFromApi/fetchOrderByNumberFromApi',
  async (number: number) => getOrderByNumberApi(number)
);

export const initialState: IOrderByNumberFromApiState = {
  orders: [],
  isLoading: false,
  error: undefined
};

const orderByNumberFromApiSlice = createSlice({
  name: 'orderByNumberFromApi',
  initialState,
  reducers: {},

  selectors: {
    selectOrdersByNumberFromApi: (sliceState) => sliceState.orders,
    selectOrdersByNumberIsLoading: (sliceState) => sliceState.isLoading
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumberFromApi.pending, (sliceState) => {
        sliceState.isLoading = true;
      })
      .addCase(fetchOrderByNumberFromApi.rejected, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.error = action.error.message;
      })
      .addCase(fetchOrderByNumberFromApi.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.orders = action.payload.orders;
      });
  }
});

export const { selectOrdersByNumberFromApi, selectOrdersByNumberIsLoading } =
  orderByNumberFromApiSlice.selectors;

export default orderByNumberFromApiSlice.reducer;
