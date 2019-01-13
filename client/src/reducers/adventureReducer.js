import {
    ADD_ADVENTURE,
    GET_ADVENTURES,
    GET_ADVENTURE,
    GET_USER_ADVENTURES,
    DELETE_ADVENTURE,
    ADVENTURE_LOADING,
    GET_WISHED_ADVENTURES,
    GET_LATEST_ADVENTURES
  } from '../actions/types';
  
  const initialState = {
    adventures: [],
    adventure: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case ADVENTURE_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_ADVENTURES:
        return {
          ...state,
          adventures: action.payload,
          loading: false
        };
      case GET_ADVENTURE:
        return {
          ...state,
          adventure: action.payload,
          loading: false
        };
      case GET_WISHED_ADVENTURES:
        return {
          ...state,
          wishedAdventures: action.payload,
          loading: false
        };
      case GET_USER_ADVENTURES:
        return {
            ...state,
            adventures: action.payload,
            loading: false
            }
      case GET_LATEST_ADVENTURES:
        return {
            ...state,
            adventure: action.payload,
            loading: false
          }
      case ADD_ADVENTURE:
        return {
          ...state,
          adventures: [action.payload, ...state.adventures]
        };
      case DELETE_ADVENTURE:
        return {
          ...state,
          adventures: state.adventures.filter(adventure => adventure._id !== action.payload)
        };
      default:
        return state;
    }
  }