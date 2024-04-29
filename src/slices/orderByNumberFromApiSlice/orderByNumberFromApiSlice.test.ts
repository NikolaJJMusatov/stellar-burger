import { expect, test, describe } from '@jest/globals';
import orderByNumberFromApiSlice, { fetchOrderByNumberFromApi } from './orderByNumberFromApiSlice';

describe('проверяем редьюсер orderByNumberFromApiSlice', () => {
  const initialState = {
    orders: [],
    isLoading: false,
    error: undefined
  };

  test('обработка экшена fetchOrderByNumberFromApi.pending', () => {
    const action = { type: fetchOrderByNumberFromApi.pending.type };
    const stateIsLoading = orderByNumberFromApiSlice(initialState, action).isLoading;
    expect(stateIsLoading).toBe(true);
  });

  test('обработка экшена fetchOrderByNumberFromApi.rejected', () => {
    const action = { type: fetchOrderByNumberFromApi.rejected.type, error: { message: 'test error fetchOrderByNumberFromApi' } };
    const stateError = orderByNumberFromApiSlice(initialState, action).error;
    expect(stateError).toBe('test error fetchOrderByNumberFromApi');
  });

  test('обработка экшена fetchOrderByNumberFromApi.fulfilled', () => {
    const action = { type: fetchOrderByNumberFromApi.fulfilled.type, payload: { orders: [ {orderByNumber: 1} ] }  };
    const state = orderByNumberFromApiSlice(initialState, action);
    expect(state).toEqual({
      orders: [ {orderByNumber: 1} ],
      isLoading: false,
      error: undefined
    });
  });
})
