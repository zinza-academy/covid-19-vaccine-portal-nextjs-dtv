import { setCookie, deleteCookie } from 'cookies-next';
import { createSlice } from '@reduxjs/toolkit';
import { ILoginResponse, IUser } from '@/types/auth';
import { authApi } from '@/api/auth';
import { AppState } from '@/lib/store';
import { ACCESS_TOKEN } from '@/utils/constants';

const initialState: ILoginResponse = {
  token: '',
  refresh_token: '',
  token_expires: 0,
  user: {} as IUser
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (_state, { payload }) => {
      const expire = new Date().getTime() + 1000 * 24 * 60 * 60;
      // set the token in the cookies
      setCookie(ACCESS_TOKEN, payload.token, {
        path: '/',
        expires: new Date(expire)
      });
      return payload;
    });
  }
});

export const selectAuthData = (state: AppState) => state.auth;

export default authSlice.reducer;
