import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  loginUserApi,
  getUserApi,
  registerUserApi,
  logoutApi,
  updateUserApi,
  TRegisterData,
  TLoginData
} from '@api';
import { setCookie, deleteCookie } from '../utils/cookie';
import { TUser } from '@utils-types';

interface IUserState {
  profile: TUser;
  error: string | undefined;
  isInit: boolean;
  isReguestLoginApi: boolean;
};

export const fetchLoginUser = createAsyncThunk(
  'user/fetchLoginUser',
  async (loginData: TLoginData) => {
    const data = await loginUserApi(loginData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const fetchGetUser = createAsyncThunk('user/fetchGetUser', async () =>
  getUserApi()
);

export const fetchLogoutUser = createAsyncThunk(
  'user/fetchLogoutUser',
  async () =>
    logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
    })
);

export const fetchRegisterUser = createAsyncThunk(
  'user/fetchRegisterUser',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const fetchUpdateUserData = createAsyncThunk(
  'user/fetchUpdateUserData',
  async (updateUserData: TRegisterData) => await updateUserApi(updateUserData)
);

const initialState: IUserState = {
  profile: {
    email: '',
    name: ''
  },
  error: undefined,
  isInit: false,
  isReguestLoginApi: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (sliceState) => {
      sliceState.profile = { email: '', name: '' };
    },
    clearErrorUserState: (sliceState) => {
      sliceState.error = '';
    }
  },

  selectors: {
    selectUserIsInit: (sliceState) => sliceState.isInit,
    selectUserProfile: (sliceState) => sliceState.profile,
    selectUserProfileName: (sliceState) => sliceState.profile.name,
    selectUserError: (sliceState) => sliceState.error,
    selectUserIsReguestLoginApi: (sliceState) => sliceState.isReguestLoginApi
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (sliceState) => {
        sliceState.isReguestLoginApi = true;
        sliceState.isInit = false;
      })
      .addCase(fetchLoginUser.rejected, (sliceState, action) => {
        sliceState.isInit = false;
        sliceState.isReguestLoginApi = false;
        sliceState.error = action.error.message;
      })
      .addCase(fetchLoginUser.fulfilled, (sliceState, action) => {
        sliceState.isInit = true;
        sliceState.isReguestLoginApi = false;
        sliceState.profile = action.payload.user;
      })

      .addCase(fetchGetUser.pending, (sliceState) => {
        sliceState.isInit = false;
        sliceState.isReguestLoginApi = true;
      })
      .addCase(fetchGetUser.rejected, (sliceState, action) => {
        sliceState.isInit = false;
        sliceState.isReguestLoginApi = false;
        sliceState.error = action.error.message;
      })
      .addCase(fetchGetUser.fulfilled, (sliceState, action) => {
        sliceState.isInit = true;
        sliceState.isReguestLoginApi = false;
        sliceState.profile = action.payload.user;
      })

      .addCase(fetchRegisterUser.pending, (sliceState) => {
        sliceState.isInit = false;
        sliceState.isReguestLoginApi = true;
      })
      .addCase(fetchRegisterUser.rejected, (sliceState, action) => {
        sliceState.isInit = false;
        sliceState.isReguestLoginApi = false;
        sliceState.error = action.error.message;
      })
      .addCase(fetchRegisterUser.fulfilled, (sliceState, action) => {
        sliceState.isInit = true;
        sliceState.isReguestLoginApi = false;
        sliceState.profile = action.payload.user;
      })

      .addCase(fetchLogoutUser.pending, (sliceState) => {
        sliceState.isReguestLoginApi = true;
      })
      .addCase(fetchLogoutUser.rejected, (sliceState, action) => {
        sliceState.isInit = false;
        sliceState.isReguestLoginApi = false;
        sliceState.error = action.error.message;
      })
      .addCase(fetchLogoutUser.fulfilled, (sliceState) => {
        sliceState.isInit = false;
        sliceState.isReguestLoginApi = false;
      })

      .addCase(fetchUpdateUserData.pending, (sliceState) => {
        sliceState.isReguestLoginApi = true;
      })
      .addCase(fetchUpdateUserData.rejected, (sliceState, action) => {
        sliceState.isReguestLoginApi = false;
        sliceState.error = action.error.message;
      })
      .addCase(fetchUpdateUserData.fulfilled, (sliceState, action) => {
        sliceState.isReguestLoginApi = false;
        sliceState.isInit = true;
        sliceState.profile = action.payload.user;
      });
  }
});

export const {
  selectUserIsInit,
  selectUserProfile,
  selectUserProfileName,
  selectUserError,
  selectUserIsReguestLoginApi
} = userSlice.selectors;

export const { userLogout, clearErrorUserState } = userSlice.actions;

export default userSlice.reducer;
