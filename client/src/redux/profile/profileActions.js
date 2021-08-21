import axios from 'axios';
import { setAlert } from '../alert/alertActions';
import API from '../../constants/apiEndPoints'

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS
} from '../../constants/actionTypes';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get(API.GET_CURRENT_PROFILE);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: GET_PROFILE,
      payload: res?.data?.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response ? error.response.data : '' }
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

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get(API.GET_ALL_PROFILE);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: GET_PROFILES,
      payload: res?.data?.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response ? error.response.data : '' }
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

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`${API.GET_PROFILE_BYID}/${userId}`);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: GET_PROFILE,
      payload: res?.data?.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response ? error.response.data : ''}
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

// Get Github repos
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`${API.GITHUB_REPOS}/${username}`);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: GET_REPOS,
      payload: res?.data?.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response ? error.response.data : '' }
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

// Create or update profile
export const createProfile = (
  formData,
  props,
  edit = false
) => async dispatch => {
  try {
    const res = await axios.post(API.CREATE_PROFILE, formData, config);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: GET_PROFILE,
      payload: res?.data?.data
    });
    props.history.push('/dashboard');
    
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response ? error.response.data : '' }
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

// Add Experience
export const addExperience = (formData, props) => async dispatch => {
  try {
    const res = await axios.put(API.ADD_EXPERIENCE, formData, config);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: UPDATE_PROFILE,
      payload: res?.data?.data
    });
    props.history.push('/dashboard');
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response ? error.response.data : '' }
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

// Add Education
export const addEducation = (formData, props) => async dispatch => {
  try {
    const res = await axios.put(API.ADD_EDUCATION, formData, config);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: UPDATE_PROFILE,
      payload: res?.data?.data
    });
    props.history.push('/dashboard');
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response ? error.response.data : '' }
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

// Delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`${API.DELETE_EXPERIENCE}/${id}`);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: UPDATE_PROFILE,
      payload: res?.data?.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response ? error.response.data : '' }
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

// Delete education
export const deleteEducation = (id) => async dispatch => {
  try {
    const res = await axios.delete(`${API.DELETE_EDUCATION}/${id}`);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: UPDATE_PROFILE,
      payload: res?.data?.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response ? error.response.data : '' }
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

// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const res = await axios.delete(API.DELETE_ACCOUNT);
      if (res.status) {
        dispatch(setAlert(res?.data?.message,'success'))
      } 
      else {
        dispatch(setAlert(res?.data?.message,'danger'))
      }
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error.response ? error.response.data : '' }
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
  }
};