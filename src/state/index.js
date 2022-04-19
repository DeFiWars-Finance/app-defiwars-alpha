import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { save, load } from "redux-localstorage-simple";

import user from "./user/reducer";

const PERSISTED_KEYS = ['user', 'transactions'];

const loadedState = load({ states: PERSISTED_KEYS });

const store = configureStore({
  reducer: {
    user,
  }
})

export default store
