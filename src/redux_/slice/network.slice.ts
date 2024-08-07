import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface NetWorkState {
  isConnected: boolean;
}

const initialState: NetWorkState = {
  isConnected: true,
};

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetwork: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
  //   extraReducers: builder => {},
});

export const {setNetwork} = networkSlice.actions;

export const networkReducer = networkSlice.reducer;
