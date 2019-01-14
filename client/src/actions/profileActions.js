import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, GET_USER_PROFILE_BY_ID } from './types';


// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
    .then(res =>
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        }, console.log("res.data get current profile",res.data)))
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        )
}

export const getProfileByUserID = (id) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/user/${id}`)
    .then(res =>
        dispatch({
            type: GET_USER_PROFILE_BY_ID,
            payload: res.data
        }))
        .catch(err =>
            dispatch({
                type: GET_USER_PROFILE_BY_ID,
                payload: {}
            })
    )
}

// Get Profile by User ID


// create Profile
export const createProfile= (profileData, history) => dispatch => {
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/profile'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
}

// Add experience
export const addExperience = (expData, history) => dispatch => {
    axios
      .post('/api/profile/experience', expData)
      .then(res => history.push('/profile'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

// Delete Experience
export const deleteExperience = id => dispatch => {
    axios
      .delete(`/api/profile/experience/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };



// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
};

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
} 