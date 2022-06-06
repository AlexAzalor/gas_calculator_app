import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dataReducer from './reducers/DataSlice';

// combineReducers accepts an object where the key names will become the keys in your root state object,
// and the values are the slice reducer functions that know how to update those slices of the Redux state.
// The key names you give to combineReducers decides what the key names of your state object will be.
const rootReducer = combineReducers({
  dataReducer,
})

// configureStore function encapsulates our store creation logic, which can then be located in its own file to ease extensibility.
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

// types with which you need to interact with the store
// having defined the dispatch type, we will not be able to dispatch those actions that we have not defined
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
