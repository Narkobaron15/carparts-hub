'use client'

import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/login_slice'
import { thunk } from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { persistCombineReducers } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

export const rootReducer = persistCombineReducers(persistConfig, {
    login: loginSlice.reducer,
})

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
