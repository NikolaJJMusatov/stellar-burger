import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '@utils-types';

interface IingredientsListState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | undefined;
}

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

export const initialState: IingredientsListState = {
  ingredients: [],
  isLoading: false,
  error: undefined
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},

  selectors: {
    selectIngredients: (sliceState) => sliceState.ingredients,
    selectIngredientsIsLoading: (sliceState) => sliceState.isLoading
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (sliceState) => {
        sliceState.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.error = action.error.message;
      })
      .addCase(fetchIngredients.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.ingredients = action.payload;
      });
  }
});

export const { selectIngredients, selectIngredientsIsLoading } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
