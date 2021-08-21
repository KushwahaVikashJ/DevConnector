import axios from 'axios';
import API from '../../constants/apiEndPoints'
import { setAlert } from '../alert/alertActions';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from '../../constants/actionTypes';
import setAuthToken from '../../utils/SetAuthToken';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(API.GET_AUTH_USER);
    dispatch({
      type: USER_LOADED,
      payload: res?.data?.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post(API.REGISTER, body, config);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res?.data?.data
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL
    });
    if(error){
      const err = error.response ? error.response.data : ''
      if(err && err.data && err.data.length>0){
        dispatch(setAlert(err.data[0].msg + ': ' + err.data[0].param,'danger'))
        return
      }
      else if(err && err.message){
        dispatch(setAlert(err.message,'danger'))
        return
      }
      dispatch(setAlert('Something went wrong. ' + error.message,'danger'))
      return 
    }
  }
};

// Login User
export const login = ({ email, password }) => async dispatch => {
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(API.LOGIN, body, config);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res?.data?.data
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL
    });
    if(error){
      const err = error.response ? error.response.data : ''
      if(err && err.data && err.data.length>0){
        dispatch(setAlert(err.data[0].msg + ': ' + err.data[0].param,'danger'))
        return
      }
      else if(err && err.message){
        dispatch(setAlert(err.message,'danger'))
        return
      }
      dispatch(setAlert('Something went wrong. ' + error.message,'danger'))
      return 
    }
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};


