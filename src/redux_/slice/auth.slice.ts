import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authenticatedApi, CreateUserResponse} from 'redux_/api';

export interface AuthState {
  isSignedIn: boolean;
  token: string | null;
  user: CreateUserResponse | null; //fix later
  lang: string;
}

const initialState: AuthState = {
  isSignedIn: false,
  token: null,
  user: null,
  lang: 'en',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: state => {
      return {
        ...initialState,
        lang: state.lang,
      };
    },
    /**
     * After users signing up for the first time we want them to complete their
     * information first and then after completing that, we will set `isSignedIn = true`
     * and redirect user to screens for authenticated users (home, profile, etc.).
     * All the requests from completeuser process need token, so it makes sense
     * to have a token, so that we can make requests.
     */
    signUp: (state, action: PayloadAction<any>) => {
      if (action.payload.data) {
        state.isSignedIn = true;
        state.token = action.payload.data?.token;
      }
    },
  },
  extraReducers: builder => {
    // Pass the action creator to `builder.addCase()`
    builder.addMatcher(
      authenticatedApi.endpoints.createUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      },
    );
  },
});

export const {signOut, signUp} = authSlice.actions;

export const authReducer = authSlice.reducer;
