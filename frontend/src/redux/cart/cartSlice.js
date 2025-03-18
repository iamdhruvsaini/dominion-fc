import getBaseURL from '@/utils/baseURL';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async Thunk to Fetch User Selected Players
export const fetchUserSelectedPlayer = createAsyncThunk('fetchUserSelection', async (user_id) => {
  try {
    const response = await fetch(`${getBaseURL()}/api/user-selection/selected-player/${user_id}`);
   
    if (!response.ok) {
      throw new Error('Failed to fetch user selected player');
    }

    return response.json();
  } catch (error) {
    console.error('Error in fetchUserSelectedPlayer:', error);
    throw error;
  }
});

// Initial State
const initialState = {
  isLoading: false,
  cartItems: [],
  isError: false
};

// Create Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload); 
    },
    removeFromCart(state,action){
      state.cartItems = state.cartItems.filter(
        (item) =>item.player_id !== action.payload.player_id // Ensure type match
      );
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserSelectedPlayer.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUserSelectedPlayer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload.data; // Assuming the data returned is in the correct format
    });

    builder.addCase(fetchUserSelectedPlayer.rejected, (state, action) => {
      console.error('Error:', action.error);
      state.isError = true;
      state.isLoading = false;
    });
  }
});

// Export Actions and Reducer
export const { addToCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
