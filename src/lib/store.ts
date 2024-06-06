import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import commonReducer from '@/lib/features/common/commonSlice';
import authReducer from '@/lib/features/auth/authSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from '@/api/auth';
import { addressApi } from '@/api/address';
import { vaccinationSitesApi } from '@/api/vaccination-sites';
import vaccinationRegistrationReducer from '@/lib/features/vaccination-registration/VaccinationRegistrationSlice';
import { vaccinationRegistrationApi } from '@/api/vaccination-registration';
import { documentsApi } from '@/api/documents';
import { vaccinationResultsApi } from '@/api/vaccination-results';
import { usersApi } from '@/api/user';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  common: commonReducer,
  auth: persistedReducer,
  vaccinationRegistration: vaccinationRegistrationReducer,
  [authApi.reducerPath]: authApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [vaccinationSitesApi.reducerPath]: vaccinationSitesApi.reducer,
  [vaccinationRegistrationApi.reducerPath]: vaccinationRegistrationApi.reducer,
  [documentsApi.reducerPath]: documentsApi.reducer,
  [vaccinationResultsApi.reducerPath]: vaccinationResultsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (gDM) => {
      return gDM({
        serializableCheck: false
      })
        .concat(authApi.middleware)
        .concat(addressApi.middleware)
        .concat(vaccinationSitesApi.middleware)
        .concat(vaccinationRegistrationApi.middleware)
        .concat(documentsApi.middleware)
        .concat(vaccinationResultsApi.middleware)
        .concat(usersApi.middleware);
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppStore: () => AppStore = useStore;
