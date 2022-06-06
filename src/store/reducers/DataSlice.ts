import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface mapRoutData {
  distanceRedux: number,
  cityRedux: string,
}

const initialState: mapRoutData = {
  distanceRedux: 0,
  cityRedux: '',
}

// createSlice does several important things for us:
// We can write the case reducers as functions inside of an object, instead of having to write a switch/case statement
// The reducers will be able to write shorter immutable update logic
// All the action creators will be generated automatically based on the reducer functions we've provided
export const dataSlice = createSlice({
  name: 'Data from map',
  initialState,
  // reducers - (analog switch/case) an object where the keys are strings, and the values are "case reducer" functions that will handle specific actions
  reducers: {
    getDistanceProp(state, action: PayloadAction<number>) {
      state.distanceRedux = action.payload;
    },
    getCityProp(state, action: PayloadAction<string>) {
      state.cityRedux = action.payload;
    },
  }
})

export default dataSlice.reducer;
