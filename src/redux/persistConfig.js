import storageModule from "redux-persist/lib/storage";

const storage = storageModule.default || storageModule;

export const persistConfig = {
  key: "root",
  storage,

  whitelist: ["auth", "user"],
};