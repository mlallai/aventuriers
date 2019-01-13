import axios from 'axios';

import {
  ADD_ADVENTURE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ADVENTURES,
  UPDATE_FILTER,
  GET_ADVENTURE,
  GET_WISHED_ADVENTURES,
  GET_USER_ADVENTURES,
  ADVENTURE_LOADING,
  DELETE_ADVENTURE,
  GET_LATEST_ADVENTURES
} from './types';

// Add Adventure
// export const addAdventure = adventureData => dispatch => {
//   dispatch(clearErrors());
//   axios
//     .post('/api/adventures', adventureData)
//     .then(res =>
//       dispatch({
//         type: ADD_ADVENTURE,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

export const addAdventure = (advData, history) => dispatch => {
  axios
    .post('/api/adventures', advData)
    .then(res => history.push('/profile'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Get All Adventures
export const getAdventures = (filters) => dispatch => {
  dispatch(setAdventureLoading());
  axios
    .get('/api/adventures')
    .then(res => {
      let  adventures  = res.data;
      if(filters  && filters.length > 0){
      adventures = adventures.filter( a => filters.find( f => a.mainActivity.find( field => field === f ) || a.level.find( field => field === f ) ) )
      }
      dispatch({
        type: GET_ADVENTURES,
        payload: adventures
      })}
    )
    .catch(err =>
      dispatch({
        type: GET_ADVENTURES,
        payload: null
      })
    );
};

// export const updateFilters = (filters) => dispatch => {
//   dispatch({
//     type: UPDATE_FILTER,
//     payload: filters,
//   });

// }

// Get Adventure
export const getAdventure = id => dispatch => {
  dispatch(setAdventureLoading());
  axios
    .get(`/api/adventures/adventure/${id}`)
    .then(res =>
      dispatch({
        type: GET_ADVENTURE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ADVENTURE,
        payload: null
      })
    );
};


 // Update Adventure
 export const updateAdventure = (advData, history) => dispatch => {
  axios
    .post('/api/adventures/update', advData)
    .then(res => {
      history.push('/profile')})
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

// Get the user's adventures for the profile

export const getUserAdventures = () => dispatch => {
  dispatch(setAdventureLoading());
  axios
    .get('/api/adventures/user')
    .then(res => {
      dispatch({
        type: GET_USER_ADVENTURES,
        payload: res.data
      })
     }
    )
    .catch(err => {
      dispatch({
        type: GET_USER_ADVENTURES,
        payload: null
      })}
    );
 };

// Delete Adventure
export const deleteAdventure = id => dispatch => {
  axios
    .delete(`/api/adventures/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ADVENTURE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// export const deleteAdventure = (id, history) => dispatch => {
//   console.log("Delete request to back");
//  axios
//    .delete(`/api/adventures/${id}`)
//    .then(res => {
//      console.log("Deleted adventure", res);
//      history.push('/profile')})
//    .catch(err => {
//      console.log("Error", err);
//      dispatch({
//        type: GET_ERRORS,
//        payload: err.response.data
//      })}
//    );
// };


// Add Like
export const addToWishList = id => dispatch => {
  axios
    .post(`/api/adventures/like/${id}`)
    .then(res => dispatch(getAdventures()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeFromWishList = id => dispatch => {
  axios
    .post(`/api/adventures/unlike/${id}`)
    .then(res => dispatch(getAdventures()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getWishedAdventures = () => dispatch => {
  dispatch(setAdventureLoading());
  axios
    .get('/api/adventures/wishlist')
    .then(res => 
      dispatch({
        type: GET_WISHED_ADVENTURES,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })  
    )
} 

// Add Comment
export const addComment = (adventureId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/adventures/comment/${adventureId}`, commentData)
    .then(res => {
      dispatch({
        type: GET_ADVENTURE,
        payload: res.data
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment
export const deleteComment = (adventureId, commentId) => dispatch => {
  axios
    .delete(`/api/adventures/comment/${adventureId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_ADVENTURE,
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

// Get latest courses
export const getLatestAdventures = () => dispatch => {
  // dispatch(setProfileLoading());
  axios.get("/api/adventures/latest")
  .then(res =>
      dispatch({
          type: GET_LATEST_ADVENTURES,
          payload: res.data
      })
    )
    .catch(err =>
      dispatch({
          type: GET_ERRORS,
          payload: null
        })
    )
}

// Set loading state
export const setAdventureLoading = () => {
  return {
    type: ADVENTURE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};