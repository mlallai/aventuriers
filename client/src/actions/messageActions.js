import axios from 'axios';

import {
    ADD_MESSAGE,
    GET_ERRORS,
    GET_USER_MESSAGES,
    GET_MESSAGE,
    MESSAGES_LOADING
  } from './types';

// Add Message
export const addMessage = (id, messData, history) => dispatch => {
    axios
      .post(`/api/messages/${id}`, messData)
      .then(res => history.push('/adventures'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

// Add Reply to Message
export const addReply = (id, messData, history) => dispatch => {
  axios
    .post(`/api/messages/reply/${id}`, messData)
    .then(res => history.push('/profile'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get the user's messages for the profile
export const getUserMessages = () => dispatch => {
    dispatch(setMessagesLoading());
    axios
      .get('/api/messages')
      .then(res => {
        dispatch({
          type: GET_USER_MESSAGES,
          payload: res.data
        })
       }
      )
      .catch(err => {
        dispatch({
          type: GET_USER_MESSAGES,
          payload: null
        })}
      );
   };

  // Get One Message
   export const getMessage = id => dispatch => {
    dispatch(setMessagesLoading());
    axios
      .get(`/api/messages/message/${id}`)
      .then(res =>
        dispatch({
          type: GET_MESSAGE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_MESSAGE,
          payload: null
        })
    );
  }

// Set loading state
export const setMessagesLoading = () => {
    return {
      type: MESSAGES_LOADING
    };
  };