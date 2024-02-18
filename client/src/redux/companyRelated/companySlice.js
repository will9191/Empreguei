import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companiesList: [],
  companyDetails: [],
  loading: false,
  error: null,
  response: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    doneSuccess: (state, action) => {
      state.companyDetails = action.payload;
      state.company = action.payload.company;
      state.jobs = action.payload.jobs;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getSuccess: (state, action) => {
      state.companiesList = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;
      state.loading = false;
      state.error = null;
      state.response = null;
    },

    getFailed: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    postDone: (state) => {
      state.loading = false;
      state.error = null;
      state.response = null;
    },
  },
});

export const {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  doneSuccess,
  postDone,
} = companySlice.actions;

export const companyReducer = companySlice.reducer;
