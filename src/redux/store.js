import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";

import rootReducer from "./reducers/rootReducer";
import { persistConfig } from "./persistConfig";

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: import.meta.env.DEV,
});

export const persistor = persistStore(store);