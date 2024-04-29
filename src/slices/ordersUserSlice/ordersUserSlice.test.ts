import { expect, test, describe } from '@jest/globals';
import ordersUserSlice, {
  fetchOrderUser,
  fetchGetOrdersApiUser,
  clearOrderUser
} from './ordersUserSlice';

describe('проверяем редьюсер ordersUserSlice', () => {
  const initialState = {
    historyOrdersUser: [],
    orderUser: null,
    requestToApi: false,
    orderRequest: false,
    error: undefined
  };

  describe('проверка экшенов fetchOrderUser', () => {
    test('обработка экшена fetchOrderUser.pending', () => {
      const action = { type: fetchOrderUser.pending.type };
      const stateOrderRequest = ordersUserSlice(initialState, action).orderRequest;
      expect(stateOrderRequest).toBe(true);
    });
  
    test('обработка экшена fetchOrderUser.rejected', () => {
      const action = { type: fetchOrderUser.rejected.type, error: { message: 'test error fetchOrderUser' } };
      const stateError = ordersUserSlice(initialState, action).error;
      expect(stateError).toBe('test error fetchOrderUser');
    });
  
    test('обработка экшена fetchOrderUser.fulfilled', () => {
      const action = { type: fetchOrderUser.fulfilled.type, payload: { order: {orderDone: 1} }  };
      const state = ordersUserSlice(initialState, action);
      expect(state).toEqual({
        historyOrdersUser: [],
        orderUser: {orderDone: 1},
        requestToApi: false,
        orderRequest: false,
        error: undefined
      });
    });
  })

  describe('проверка экшенов fetchGetOrdersApiUser', () => {
    test('обработка экшена fetchGetOrdersApiUser.pending', () => {
      const action = { type: fetchGetOrdersApiUser.pending.type };
      const stateRequestToApi = ordersUserSlice(initialState, action).requestToApi;
      expect(stateRequestToApi).toBe(true);
    });
  
    test('обработка экшена fetchGetOrdersApiUser.rejected', () => {
      const action = { type: fetchGetOrdersApiUser.rejected.type, error: { message: 'test error fetchGetOrdersApiUser' } };
      const stateError = ordersUserSlice(initialState, action).error;
      expect(stateError).toBe('test error fetchGetOrdersApiUser');
    });
  
    test('обработка экшена fetchGetOrdersApiUser.fulfilled', () => {
      const action = { type: fetchGetOrdersApiUser.fulfilled.type,
        payload: [
          {order: 1},
          {order: 2},
          {order: 3}
        ]
      };
      const state = ordersUserSlice(initialState, action);
      
      expect(state).toEqual({
        historyOrdersUser: [
          {order: 1},
          {order: 2},
          {order: 3} 
        ],
        orderUser: null,
        requestToApi: false,
        orderRequest: false,
        error: undefined
      });
    });
  })

  describe('проверка других экшенов ordersUserSlice', () => {
    test('обработка экшена очиcтки state заказа', () => {
      const initialState = {
        historyOrdersUser: [
          {
            _id: "6628d1b797ede0001d067629",
            status: "done",
            name: "Краторный spicy био-марсианский бургер",
            createdAt: "2024-04-24T09:32:39.323Z",
            updatedAt: "2024-04-24T09:32:39.965Z",
            number: 87787,
            ingredients: []
          }
        ],
        orderUser: {
          _id: "6628d1b797ede0001d067629",
          status: "done",
          name: "Краторный spicy био-марсианский бургер",
          createdAt: "2024-04-24T09:32:39.323Z",
          updatedAt: "2024-04-24T09:32:39.965Z",
          number: 87787,
          ingredients: []
      },
        requestToApi: true,
        orderRequest: false,
        error: undefined
      };

      const expectInitialState = {
        historyOrdersUser: [
          {
            _id: "6628d1b797ede0001d067629",
            status: "done",
            name: "Краторный spicy био-марсианский бургер",
            createdAt: "2024-04-24T09:32:39.323Z",
            updatedAt: "2024-04-24T09:32:39.965Z",
            number: 87787,
            ingredients: []
          }
        ],
        orderUser: null,
        requestToApi: true,
        orderRequest: false,
        error: undefined
      };

      const state = ordersUserSlice(initialState, clearOrderUser());
      expect(state).toEqual(expectInitialState);
    });
  })

})
