import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobsList: [],
  jobDetails: [],
  companyJobs: [],
  jobSearch: [],
  loading: false,
  error: null,
  response: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    doneSuccess: (state, action) => {
      state.companyJobs = action.payload.data;
      state.createdBy = action.payload.createdBy;
      state.jobDetails = action.payload.job;
      state.jobInfo = action.payload.applicants;
      state.jobsList = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;
      state.jobSearch = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getSuccess: (state, action) => {
      state.status = "success";
      state.jobsList = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;
      state.jobsFilter = action.payload;
      state.jobSearch = action.payload;
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
  },
});

export const { getRequest, doneSuccess, getSuccess, getFailed, getError } =
  jobSlice.actions;

export const jobReducer = jobSlice.reducer;
