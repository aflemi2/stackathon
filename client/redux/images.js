import axios from 'axios';

//Action Types
const SET_IMAGES = 'SET_IMAGES';
const UPDATE_IMAGE = 'UDPATE_IMAGE';
const DELETE_IMAGE = 'DELETE_IMAGE';
const CREATE_IMAGE = 'CREATE_IMAGE';

//Action Creators for imagesReducer
export default (state = [], action) => {
  switch (action.type) {
    case SET_IMAGES:
      state = action.images;
      break;
    case UPDATE_IMAGE:
      state = state.map( image => image.id === action.image.id ? action.image : image);
      break;
    case DELETE_IMAGE:
      state = [...state, action.image];
      break;
    case CREATE_IMAGE:
      state = state.filter( image => image.id !== action.image.id);
      break;
  }
  return state;
};

//Thunk Creators
export const loadImages = () => {
  return (dispatch) => {
    return axios.get('/api/images')
      .then( result => result.data)
      .then( images => dispatch({
        type: SET_IMAGES,
        images
      })
      );
  };
};

export const deleteImage = ( image, history ) => {
  return (dispatch) => {
    return axios.delete(`/api/images/${image.id}`)
      .then(() => dispatch({
        type: DELETE_IMAGE,
        image
      })
      )
      .then(() => {
        history.push('/images');
      });
  };
};

export const saveImage = ( image, history ) => {
  if (image.id) {
    return (dispatch) => {
      return axios.put(`/api/images/${image.id}`, image)
        .then( result => result.data)
        .then( image => dispatch({
          type: UPDATE_IMAGE,
          image
        })
        )
        .then(() => {
          if (history) {
            history.push(`/images/${image.id}`);
          }
        });
    };
  }
  return (dispatch) => {
    return axios.post('/api/images', image)
      .then( result => result.data)
      .then( image => dispatch({
        type: CREATE_IMAGE,
        image
      })
      )
      .then(( data ) => {
        history.push(`/images/${data.image.id}`);
      });
  };
};
