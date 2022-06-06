import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";


interface UserState {
  users: User[];
  isLoading: boolean;
  error: string;
  distanceRedux: number,
  cityRedux: string,
}

const initialState = {
  users: [],
  isLoading: false,
  error: '',
  distanceRedux: 0,
  cityRedux: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getDistanceProp(state, action: PayloadAction<number>) {
      state.distanceRedux = action.payload;
    },
    getCityProp(state, action: PayloadAction<string>) {
      state.cityRedux = action.payload;
    },
  }
})

export default userSlice.reducer;
