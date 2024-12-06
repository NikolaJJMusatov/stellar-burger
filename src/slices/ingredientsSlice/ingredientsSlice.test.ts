import { expect, test, describe } from '@jest/globals';
import ingredientsSlice, {
  fetchIngredients,
  initialState
} from './ingredientsSlice';

describe('проверяем редьюсер ingredientSlice', () => {
  test('обработка экшена fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const stateIsLoading = ingredientsSlice(initialState, action).isLoading;
    expect(stateIsLoading).toBe(true);
  });

  test('обработка экшена fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'test error fetchIngredients' }
    };
    const stateError = ingredientsSlice(initialState, action).error;
    expect(stateError).toBe('test error fetchIngredients');
  });

  test('обработка экшена fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: [{ ingredient: 1 }, { ingredient: 2 }, { ingredient: 3 }]
    };
    const state = ingredientsSlice(initialState, action);
    expect(state).toEqual({
      ingredients: [{ ingredient: 1 }, { ingredient: 2 }, { ingredient: 3 }],
      isLoading: false,
      error: undefined
    });
  });
});
