import { createWrapper } from "next-redux-wrapper";
import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../store/reducers/users";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {combineReducers} from "redux"; 
import { getDefaultMiddleware } from '@reduxjs/toolkit';


let store;

const persistConfig = {
  key: 'root',
  storage
}

const reducers = combineReducers({
  user: userReducer,
});


const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const persistedReducer = persistReducer(persistConfig, reducers);

const makeStore = () => {
  store = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== 'production',
      middleware: customizedMiddleware
  });

    store.__PERSISTOR = persistStore(store);

  // Return store
  return store;
};



export const wrapper = createWrapper(makeStore, { debug: true });