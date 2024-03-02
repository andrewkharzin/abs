import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FollowState {
  following: string[]; // Store the list of followed profile IDs
}

const initialState: FollowState = {
  following: [],
};

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    followUser(state, action: PayloadAction<string>) {
      state.following.push(action.payload);
    },
    unfollowUser(state, action: PayloadAction<string>) {
      state.following = state.following.filter(id => id !== action.payload);
    },
  },
});

export const { followUser, unfollowUser } = followSlice.actions;
export default followSlice.reducer;
