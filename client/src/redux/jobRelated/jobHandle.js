import axios from 'axios';

import {
  getRequest,
  doneSuccess,
  getSuccess,
  getFailed,
  getError,
} from './jobSlice';

export const getAllJobs = (search, page) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/jobs?search=${search}&page=${page}`,
      search,
      page
    );
    if (result.data) {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const searchJobs = (searchQuery, page) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/jobs/search?searchQuery=${
        searchQuery.search || 'none'
      }&page=${page}`,
      searchQuery,
      page
    );
    if (result.data) {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getJobDetails = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`
    );
    if (result.data) {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getCompanyJobs = (id, page) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/jobs/getCompanyJobs/${id}/?page=${page}`
    );
    if (result.data) {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
