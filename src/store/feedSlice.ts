import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listData: [] as any[],
  currentPage: 1,
  isLoading: false,
  errorMsg: null as string | null,
  searchTxt: '',
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setListData: (state, action) => {
      if (action.payload.refresh) {
        state.listData = action.payload.data;
        state.currentPage = 1;
      } else {
        state.listData = [...state.listData, ...action.payload.data];
      }
      state.isLoading = false;
    },
    nextPage: (state) => {
      state.currentPage += 1;
    },
    setSearchTxt: (state, action) => {
      state.searchTxt = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setLoading, setListData, nextPage, setSearchTxt, setErrorMsg } = feedSlice.actions;
export default feedSlice.reducer;