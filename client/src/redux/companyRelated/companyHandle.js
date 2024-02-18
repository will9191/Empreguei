import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  doneSuccess,
  postDone,
} from "./companySlice";

export const getAllCompanies = (page) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/company?page=${page}`,
      page
    );
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const searchCompanies = (searchQuery) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/company/search?searchQuery=${
        searchQuery.search || "none"
      }`,
      searchQuery
    );
    if (result.data) {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getCompanyDetails = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/company/${id}`
    );
    if (result.data) {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const getCompanyJobs = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/company/jobs/${id}`
    );
    if (result.data) {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const updateCompany = (id, fields) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/company/updateInfo/${id}`,
      fields,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (result.data.message) {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const updateCompanyPicture =
  (id, setPostImage, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
      const result = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/company/updatePhoto/${id}`,
        setPostImage,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data.message) {
        dispatch(getFailed(result.data.message));
      } else {
        dispatch(stuffDone());
      }
    } catch (error) {
      dispatch(getError(error));
    }
  };
