import {
    ADD_MESSAGE,
    GET_USER_MESSAGES,
    GET_MESSAGE
  } from '../actions/types';
  
  const initialState = {
    message: {},
    messages: {},
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_MESSAGE:
        return {
          ...state,
          messages: [action.payload, ...state.messages]
        };
      case GET_USER_MESSAGES:
        return {
          ...state,
          messages: action.payload,
          loading: false
        }
      case GET_MESSAGE:
        return {
          ...state,
          message: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }