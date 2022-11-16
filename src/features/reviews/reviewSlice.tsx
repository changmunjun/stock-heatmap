import  {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import * as api from '../api';


const initialState = {
    value: [],
    status: 'empty'
};

export const reviewsAsync = createAsyncThunk(
    'reviews/fetchReviews',
    async (bookId:any) => {
        return await api.fetchReviews(bookId);
    }
);

export const addReviewAsync = createAsyncThunk(
    'reviews/addReview',
    async (review:any) => {
        return await api.addReview(review);
    }
);

export const reviewSlice = createSlice(
    { name: 'reviews',
      initialState,
      reducers: {},
      extraReducers: (builder:any) => {
        builder.addCase(reviewsAsync.fulfilled, 
            (state:any, action:any) => {
                state.status = 'idle';
                state.value = action.payload;
        }).addCase(addReviewAsync.fulfilled, 
            (state:any, action:any) => {
                state.status = 'idle';
                state.value = [action.payload, ...state.value];
        });
      }
   });

//export const { reviews } = reviewSlice.actions;

export const selectAllReviews = (state:any) => state.reviews.value;

export default reviewSlice.reducer;   