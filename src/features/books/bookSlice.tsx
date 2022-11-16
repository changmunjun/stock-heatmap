import  {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import * as api from '../api';


const initialState = {
    value: [],
    status: 'empty'
};

export const booksAsync = createAsyncThunk(
    'books/fetchBooks',
    async () => {
        return await api.fetchAllBooks();
    }
);

export const addBookAsync = createAsyncThunk(
    'books/addBook',
    async (book:any) => {
        return await api.addBook(book);
    }
);

export const bookSlice = createSlice(
    { name: 'books',
      initialState,
      reducers: {},
      extraReducers: (builder:any) => {
        builder.addCase(booksAsync.fulfilled, 
            (state:any, action:any) => {
                state.status = 'idle';
                state.value = action.payload;
        }).addCase(addBookAsync.fulfilled, 
            (state:any, action:any) => {
                state.status = 'idle';
                state.value = [action.payload, ...state.value];
        });
      }
   });

export const selectAllBooks = (state:any) => state.books.value;

export const selectBookById = (state:any, id:any) => {
    return state.books.value.find((item:any) => item.bookId === id);
}

export default bookSlice.reducer;   