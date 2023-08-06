import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import adminSlice from "./adminSlice";
import allUsersSlice from "./allUsersSlice";

const rootReducer = combineReducers({
  user:userSlice,
  admin:adminSlice,
  allUsers:allUsersSlice
})

const persistConfig = {
  key: 'counter',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
})

const persistor = persistStore(store)

export { persistor, store}