import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

interface IOrdersUserState {
  historyOrdersUser: TOrder[];
  orderUser: TOrder | null;
  requestToApi: boolean;
  orderRequest: boolean;
  error: string | undefined;
};

export const fetchGetOrdersApiUser = createAsyncThunk(
  'ordersUser/fetchGetOrdersApiUser',
  async () => getOrdersApi()
);

export const fetchOrderUser = createAsyncThunk(
  'ordersUser/fetchOrderUser',
  async (data: string[]) => orderBurgerApi(data)
);

const initialState: IOrdersUserState = {
  historyOrdersUser: [],
  orderUser: null,
  requestToApi: false,
  orderRequest: false,
  error: undefined
};

const ordersUserSlice = createSlice({
  name: 'ordersUser',
  initialState,
  reducers: {
    clearOrderUser: (sliceState) => {
      sliceState.orderUser = null;
    }
  },

  selectors: {
    selectHistoryOrdersUser: (sliceState) => sliceState.historyOrdersUser,
    selectOrderUser: (sliceState) => sliceState.orderUser,
    selectRequestToApiOrdersUser: (sliceState) => sliceState.requestToApi,
    selectOrderRequest: (sliceState) => sliceState.orderRequest
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetOrdersApiUser.pending, (sliceState) => {
        sliceState.requestToApi = true;
      })
      .addCase(fetchGetOrdersApiUser.rejected, (sliceState, action) => {
        sliceState.requestToApi = false;
        sliceState.error = action.error.message;
      })
      .addCase(fetchGetOrdersApiUser.fulfilled, (sliceState, action) => {
        sliceState.requestToApi = false;
        sliceState.historyOrdersUser = action.payload;
      })

      .addCase(fetchOrderUser.pending, (sliceState) => {
        sliceState.orderRequest = true;
      })
      .addCase(fetchOrderUser.rejected, (sliceState, action) => {
        sliceState.orderRequest = false;
        sliceState.error = action.error.message;
      })
      .addCase(fetchOrderUser.fulfilled, (sliceState, action) => {
        sliceState.orderRequest = false;
        sliceState.orderUser = action.payload.order;
      });
  }
});

export const {
  selectHistoryOrdersUser,
  selectRequestToApiOrdersUser,
  selectOrderRequest,
  selectOrderUser
} = ordersUserSlice.selectors;

export const { clearOrderUser } = ordersUserSlice.actions;

export default ordersUserSlice.reducer;
