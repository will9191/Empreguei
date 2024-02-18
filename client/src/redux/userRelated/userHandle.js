import axios from 'axios';
import {
  authRequest,
  stuffAdded,
  authSuccess,
  authFailed,
  authError,
  authLogout,
  doneSuccess,
  getDeleteSuccess,
  getRequest,
  getFailed,
  getError,
} from './userSlice';

export const loginUser = (fields, address) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/login`,
      fields,
      address,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (result.data.role) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(authFailed(result.data.message));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

export const registerUser = (fields, role) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/${role}/register`,
      fields,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (result.data.role) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(authFailed(result.data.message));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/${address}/details/${id}`,
      address,
      id
    );
    if (result.data) {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const deleteUser = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/${address}/${id}`
    );
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getDeleteSuccess());
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const updateUserInfo = (fields, id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/${address}/updateInfo/${id}`,
      fields,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (result.data) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const updateUserPicture = (fields, id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/${address}/updatePhoto/${id}`,
      fields,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (result.data) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const addJob = (fields) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/jobs/new`,
      fields
    );

    if (result) {
      dispatch(stuffAdded(result.data));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

export const applyFor = (jobId, client) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/client/apply`,
      jobId,
      client
    );

    if (result) {
      dispatch(stuffAdded(result.data));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

export const unapplyFor = (jobId, client) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/client/unapply`,
      jobId,
      client
    );

    if (result) {
      dispatch(stuffAdded(result.data));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

export const deleteJob = (id) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`
    );

    if (result) {
      dispatch(stuffAdded(result.data));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

export const editJob = (id, fields) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`,
      fields
    );

    if (result) {
      dispatch(stuffAdded(result.data));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};
