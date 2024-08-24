import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./api/baseApi";

const reducers = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type RootReducer = ReturnType<typeof reducers>