import { expect, test, describe } from '@jest/globals';
import userSlice, {
  fetchLoginUser,
  fetchGetUser,
  fetchRegisterUser,
  fetchLogoutUser,
  fetchUpdateUserData,
  userLogout,
  clearErrorUserState
} from './userSlice';

describe('проверяем редьюсер userSlice', () => {
  const initialState = {
    profile: {
      email: '',
      name: ''
    },
    error: undefined,
    isInit: false,
    isReguestLoginApi: false
  };


  describe('проверка экшенов fetchLoginUser', () => {
    test('обработка экшена fetchLoginUser.pending', () => {
      const action = { type: fetchLoginUser.pending.type };
      const stateIsInit = userSlice(initialState, action).isInit;
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;
      expect(stateIsInit).toBe(false);
      expect(stateIsReguestLoginApi).toBe(true);
    });

    test('обработка экшена fetchLoginUser.rejected', () => {
      const action = { type: fetchLoginUser.rejected.type, error: { message: 'test error fetchLoginUser' } };
      const stateIsInit = userSlice(initialState, action).isInit;
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;
      const stateError = userSlice(initialState, action).error;
      expect(stateIsInit).toBe(false);
      expect(stateIsReguestLoginApi).toBe(false);     
      expect(stateError).toBe('test error fetchLoginUser');
    });

    test('обработка экшена fetchLoginUser.fulfilled', () => {
      const action = { type: fetchLoginUser.fulfilled.type,
        payload: {
          user: {
            email: 'ChuckNorris@qmail.com',
            name: 'Chuck Norris'
          }
        }
      };
      const stateIsInit = userSlice(initialState, action).isInit;
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;      
      const state = userSlice(initialState, action);
      expect(stateIsInit).toBe(true);
      expect(stateIsReguestLoginApi).toBe(false);  
      expect(state).toEqual({
        profile: {
          email: 'ChuckNorris@qmail.com',
          name: 'Chuck Norris'
        },
        error: undefined,
        isInit: true,
        isReguestLoginApi: false
      });
    });
  });

  describe('проверка экшенов fetchGetUser', () => {
    test('обработка экшена fetchGetUser.pending', () => {
      const action = { type: fetchGetUser.pending.type };
      const stateIsInit = userSlice(initialState, action).isInit;
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;
      expect(stateIsInit).toBe(false);
      expect(stateIsReguestLoginApi).toBe(true);
    });

    test('обработка экшена fetchGetUser.rejected', () => {
      const action = { type: fetchGetUser.rejected.type, error: { message: 'test error fetchGetUser' } };
      const stateIsInit = userSlice(initialState, action).isInit;
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;
      const stateError = userSlice(initialState, action).error;
      expect(stateIsInit).toBe(false);
      expect(stateIsReguestLoginApi).toBe(false);     
      expect(stateError).toBe('test error fetchGetUser');
    });

    test('обработка экшена fetchGetUser.fulfilled', () => {
      const action = { type: fetchGetUser.fulfilled.type,
        payload: {
          user: {
            email: 'ChuckNorris@qmail.com',
            name: 'Chuck Norris'
          }
        }
      };
      const stateIsInit = userSlice(initialState, action).isInit;
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;      
      const state = userSlice(initialState, action);
      expect(stateIsInit).toBe(true);
      expect(stateIsReguestLoginApi).toBe(false);  
      expect(state).toEqual({
        profile: {
          email: 'ChuckNorris@qmail.com',
          name: 'Chuck Norris'
        },
        error: undefined,
        isInit: true,
        isReguestLoginApi: false
      });
    });
  });

  describe('проверка экшенов fetchRegisterUser', () => {
    test('обработка экшена fetchRegisterUser.pending', () => {
      const action = { type: fetchRegisterUser.pending.type };
      const stateIsInit = userSlice(initialState, action).isInit;
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;
      expect(stateIsInit).toBe(false);
      expect(stateIsReguestLoginApi).toBe(true);
    });

    test('обработка экшена fetchRegisterUser.rejected', () => {
      const action = { type: fetchRegisterUser.rejected.type, error: { message: 'test error fetchRegisterUser' } };
      const stateIsInit = userSlice(initialState, action).isInit;
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;
      const stateError = userSlice(initialState, action).error;
      expect(stateIsInit).toBe(false);
      expect(stateIsReguestLoginApi).toBe(false);     
      expect(stateError).toBe('test error fetchRegisterUser');
    });

    test('обработка экшена fetchRegisterUser.fulfilled', () => {
      const action = { type: fetchRegisterUser.fulfilled.type,
        payload: {
          user: {
            email: 'ChuckNorris@qmail.com',
            name: 'Chuck Norris'
          }
        }
      };
      const stateIsInit = userSlice(initialState, action).isInit;
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;      
      const state = userSlice(initialState, action);
      expect(stateIsInit).toBe(true);
      expect(stateIsReguestLoginApi).toBe(false);  
      expect(state).toEqual({
        profile: {
          email: 'ChuckNorris@qmail.com',
          name: 'Chuck Norris'
        },
        error: undefined,
        isInit: true,
        isReguestLoginApi: false
      });
    });
  });

  describe('проверка экшенов fetchLogoutUser', () => {
    test('обработка экшена fetchLogoutUser.pending', () => {
      const action = { type: fetchLogoutUser.pending.type };
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;
      expect(stateIsReguestLoginApi).toBe(true);
    });

    test('обработка экшена fetchLogoutUser.rejected', () => {
      const action = { type: fetchLogoutUser.rejected.type, error: { message: 'test error fetchLogoutUser' } };
      const stateIsInit = userSlice(initialState, action).isInit;
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;
      const stateError = userSlice(initialState, action).error;
      expect(stateIsInit).toBe(false);
      expect(stateIsReguestLoginApi).toBe(false);     
      expect(stateError).toBe('test error fetchLogoutUser');
    });

    test('обработка экшена fetchLogoutUser.fulfilled', () => {
      const action = { type: fetchLogoutUser.fulfilled.type};
      const stateIsInit = userSlice(initialState, action).isInit;
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;      
      expect(stateIsInit).toBe(false);
      expect(stateIsReguestLoginApi).toBe(false);
    });
  });

  describe('проверка экшенов fetchUpdateUserData', () => {
    test('обработка экшена fetchUpdateUserData.pending', () => {
      const action = { type: fetchUpdateUserData.pending.type };
      const stateIsInit = userSlice(initialState, action).isInit;
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;
      expect(stateIsInit).toBe(false);
      expect(stateIsReguestLoginApi).toBe(true);
    });

    test('обработка экшена fetchUpdateUserData.rejected', () => {
      const action = { type: fetchUpdateUserData.rejected.type, error: { message: 'test error fetchUpdateUserData' } };
      const stateIsInit = userSlice(initialState, action).isInit;
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;
      const stateError = userSlice(initialState, action).error;
      expect(stateIsInit).toBe(false);
      expect(stateIsReguestLoginApi).toBe(false);     
      expect(stateError).toBe('test error fetchUpdateUserData');
    });

    test('обработка экшена fetchUpdateUserData.fulfilled', () => {
      const action = { type: fetchUpdateUserData.fulfilled.type,
        payload: {
          user: {
            email: 'ChuckNorris@qmail.com',
            name: 'Chuck Norris'
          }
        }
      };
      const stateIsInit = userSlice(initialState, action).isInit;
      const stateIsReguestLoginApi = userSlice(initialState, action).isReguestLoginApi;      
      const state = userSlice(initialState, action);
      expect(stateIsInit).toBe(true);
      expect(stateIsReguestLoginApi).toBe(false);  
      expect(state).toEqual({
        profile: {
          email: 'ChuckNorris@qmail.com',
          name: 'Chuck Norris'
        },
        error: undefined,
        isInit: true,
        isReguestLoginApi: false
      });
    });
  });

  describe('проверка других экшенов userSlice', () => {
    test('обработка экшена выхода пользователя', () => {
      const initialState = {
        profile: {
          email: 'ChuckNorris@qmail.com',
          name: 'Chuck Norris'
        },
        error: undefined,
        isInit: true,
        isReguestLoginApi: false
      };

      const expectInitialState = {
        profile: {
          email: '',
          name: ''
        },
        error: undefined,
        isInit: false,
        isReguestLoginApi: false
      };

      const state = userSlice(initialState, userLogout());
      expect(state).toEqual(expectInitialState);
    });

    test('обработка экшена очистки ошибок state', () => {
      const initialState = {
        profile: {
          email: '',
          name: ''
        },
        error: 'test error fetchUpdateUserData',
        isInit: false,
        isReguestLoginApi: false
      };

      const expectInitialState = {
        profile: {
          email: '',
          name: ''
        },
        error: undefined,
        isInit: false,
        isReguestLoginApi: false
      };

      const state = userSlice(initialState, clearErrorUserState());
      expect(state).toEqual(expectInitialState);
    });
  })

})
