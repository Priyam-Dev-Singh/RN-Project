import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import feedReducer from './feedSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['feed'],
};

const pReducer = persistReducer(persistConfig, feedReducer);

export const store = configureStore({
  reducer: {
    feed: pReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;