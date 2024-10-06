import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import genreReducer from "./slices/genreSlices";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["genres"],
};

const persistedReducer = persistReducer(persistConfig, genreReducer);

const store = configureStore({
  reducer: {
    genres: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
