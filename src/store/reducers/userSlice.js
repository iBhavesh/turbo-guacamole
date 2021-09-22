import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  users: [
    {name: 'John Doe', age: 45, profession: 'Doctor'},
    {name: 'Jane Does', age: 40, profession: 'Engineer'},
  ],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const {addUser} = userSlice.actions;
export default userSlice.reducer;
