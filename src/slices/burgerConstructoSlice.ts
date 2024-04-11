import { TIngredient, TConstructorIngredient } from '@utils-types';
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

interface IBurgerConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

type TIngredientWithId = TIngredient & { id: string };

const initialState: IBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredientsBurger: {
      reducer: (sliceState, action: PayloadAction<TIngredientWithId>) => {
        if (action.payload.type === 'bun') {
          sliceState.constructorItems.bun = action.payload;
        } else if (action.payload.type === 'main') {
          sliceState.constructorItems.ingredients.push(action.payload);
        } else if (action.payload.type === 'sauce') {
          sliceState.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },

    removeIngredientFromBurger: (
      sliceState,
      action: PayloadAction<TIngredientWithId>
    ) => {
      sliceState.constructorItems.ingredients =
        sliceState.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id != action.payload.id
        );
    },

    clearBurgerConstructor: (sliceState) => {
      sliceState.constructorItems = { bun: null, ingredients: [] };
    }
  },

  selectors: {
    selectBurgerConstructorState: (sliceState) => sliceState
  }
});

export const { selectBurgerConstructorState } =
  burgerConstructorSlice.selectors;

export const {
  addIngredientsBurger,
  removeIngredientFromBurger,
  clearBurgerConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
