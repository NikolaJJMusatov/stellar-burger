import { rootReducer } from './store';
import { configureStore } from '@reduxjs/toolkit';

test('проверяем инициализацию rootReducer', () => {
  const store = configureStore({
    reducer: rootReducer
  });

  const action = { type: 'UNKNOWN_ACTION' };
  const expected = rootReducer(undefined, action);

  expect(expected).toEqual(store.getState());
});
