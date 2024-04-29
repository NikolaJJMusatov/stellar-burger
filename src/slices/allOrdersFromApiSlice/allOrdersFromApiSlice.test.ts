import { expect, test, describe } from '@jest/globals';
import allOrdersFromApiSlice, { fetchAllOrdersFromApi } from './allOrdersFromApiSlice';

describe('проверяем редьюсер allOrdersFromApiSlice', () => {
  const initialState = {
    feeds: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: undefined
  };

  test('обработка экшена fetchAllOrdersFromApi.pending', () => {
    const action = { type: fetchAllOrdersFromApi.pending.type };
    const stateIsLoading = allOrdersFromApiSlice(initialState, action).isLoading;
    expect(stateIsLoading).toBe(true);
  });

  test('обработка экшена fetchAllOrdersFromApi.rejected', () => {
    const action = { type: fetchAllOrdersFromApi.rejected.type, error: { message: 'test error fetchAllOrdersFromApi' } };
    const stateError = allOrdersFromApiSlice(initialState, action).error;
    expect(stateError).toBe('test error fetchAllOrdersFromApi');
  });

  test('обработка экшена fetchAllOrdersFromApi.fulfilled', () => {
    const action = { type: fetchAllOrdersFromApi.fulfilled.type,
      payload: {
        orders: [
          {order: 1},
          {order: 2},
          {order: 3}
        ],
        total: 77777,
        totalToday: 77,
      }
    };
    
    const state = allOrdersFromApiSlice(initialState, action);
    expect(state).toEqual({
      feeds:[
        {order: 1},
        {order: 2},
        {order: 3}
      ],
      isLoading: false,
      error: undefined,
      total: 77777,
      totalToday: 77,
    });
  });
})
