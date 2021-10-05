import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      profession: 'Doctor',
      phone: '+91 9874121233',
      address:
        'Grahams Land, Jubilee Park, Jubeeli Park, Tollygunge, Kolkata, West Bengal 700040',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 2,
      name: 'Jane Doe',
      age: 40,
      profession: 'Engineer',
      phone: '+91 7894571212',
      address: '85, Sultan Alam Rd, Kolkata, West Bengal 700033',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 3,
      name: 'Michael Scott',
      age: 40,
      profession: 'Regional Manager',
      phone: '+91 7774448898',
      address:
        '40-48, Tollygunge Circular Rd, Tollygunge, Kolkata, West Bengal 700033',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 4,
      name: 'Angela Martin',
      age: 40,
      profession: 'Accountant',
      phone: '+91 9879997887',
      address:
        '177, Shyama Prasad Mukherjee Rd, Lake Market, Kalighat, Kolkata, West Bengal 700029',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 5,
      name: 'Dwight',
      age: 40,
      profession: 'Salesman',
      phone: '+91 7847854798',
      address:
        'No.51, Basanta Lal Saha Rd, Mahabirtala, Kalabagan, Bhatikhana, Kolkata, West Bengal 700053',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
    },
  ],
  selectedUsers: [],
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
    addSelectedUser(state, action) {
      if (action.payload) {
        state.selectedUsers.push(action.payload);
      }
    },
    removeSelectedUser(state, action) {
      state.selectedUsers = state.selectedUsers.filter(
        value => value.id !== action.payload,
      );
    },
  },
});

export const {addUser, setUsers, addSelectedUser, removeSelectedUser} =
  userSlice.actions;
export default userSlice.reducer;
