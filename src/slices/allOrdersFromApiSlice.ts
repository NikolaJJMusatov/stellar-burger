import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

interface IAllOrdersFromApiState {
  feeds: TOrder[],
  total: number,
  totalToday: number,
  isLoading: boolean,
  error: string | undefined
}

export const fetchAllOrdersFromApi = createAsyncThunk(
  'allOrdersFromApi/fetchAllOrdersFromApi',
    async () => 
      getFeedsApi()
);

const initialState: IAllOrdersFromApiState  = {
  feeds: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: undefined
};


const allOrdersFromApiSlice = createSlice({
  name: 'allOrdersFromApi',
  initialState,
  reducers: {
  },

  selectors: {
   selectAllOrdersFromApi: (sliceState) => sliceState.feeds,
   selectAllOrdersFromApiIsLoading: (sliceState) => sliceState.isLoading,
   selectAllOrdersFromApiTotal: (sliceState) => sliceState.total,
   selectAllOrdersFromApiTotalToday: (sliceState) => sliceState.totalToday,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrdersFromApi.pending, (sliceState) => {
        sliceState.isLoading = true;
      })
      .addCase(fetchAllOrdersFromApi.rejected, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.error = action.error.message;
      })
      .addCase(fetchAllOrdersFromApi.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.feeds = action.payload.orders;
        sliceState.total = action.payload.total;
        sliceState.totalToday = action.payload.totalToday
      })
  }
});

export const { 
  selectAllOrdersFromApi,
  selectAllOrdersFromApiIsLoading,
  selectAllOrdersFromApiTotal,
  selectAllOrdersFromApiTotalToday
  
} = allOrdersFromApiSlice.selectors;

export default allOrdersFromApiSlice.reducer;
