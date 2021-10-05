import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import graphDataReducer from '../features/graphDataSlice';

export const store = configureStore({
  reducer: {
    data: graphDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;