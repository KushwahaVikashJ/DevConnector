import axios from 'axios';
import { setAlert } from '../alert/alertActions';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../../constants/actionTypes';

const config = {
    headers: {
      'Content-Type': 'application/json'
    }
};
// Get posts
export const getAllPost = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/user/post');
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: GET_POSTS,
      payload: res?.data?.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
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

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/v1/user/post/like/${id}`);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.message,'danger'))
    }
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res?.data?.data }
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response ? error.response.data : '' }
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

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/v1/user/post/unlike/${id}`);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res?.data?.data }
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response ? error.response.data : '' }
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

// Delete post
export const deletePost = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/user/post/${id}`);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: DELETE_POST,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
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

// Add post
export const addPost = formData => async dispatch => {
  try {
    const res = await axios.post('/api/v1/user/post', formData, config);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: ADD_POST,
      payload: res?.data?.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response ? error.response.data : '' }
    });
    if(error){
      const err = error.response ? error.response.data : ''
      if(err && err.data && err.data.length>0){
        dispatch(setAlert(err.data[0].msg + ': ' + err.data[0].param,'danger'))
        return
      }
      else if(err && err.msg){
        dispatch(setAlert(err.msg,'danger'))
        return
      }
      dispatch(setAlert('Something went wrong. ' + error.message,'danger'))
      return 
    }
  }
};

// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/user/post/${id}`);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: GET_POST,
      payload: res?.data?.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
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

// Add comment
export const addComment = (formData,postId) => async dispatch => {
  try {
    const res = await axios.post(
      `/api/v1/user/post/comment/${postId}`,
      formData,
      config
    );
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: ADD_COMMENT,
      payload: res?.data?.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
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

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/user/post/comment/${postId}/${commentId}`);
    if (res.status) {
      dispatch(setAlert(res?.data?.message,'success'))
    } 
    else {
      dispatch(setAlert(res?.data?.message,'danger'))
    }
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
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