import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

export const makeStore = () => {
  return configureStore({
    reducer: {}
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppStore: () => AppStore = useStore;
