import axios from 'axios';

//Action Types
const SET_DANCERS = 'SET_DANCERS';
const UPDATE_DANCER = 'UDPATE_DANCER';
const DELETE_DANCER = 'DELETE_DANCER';
const CREATE_DANCER = 'CREATE_DANCER';

//Action Creators for dancersReducer
export default (state = [], action) => {
  switch (action.type) {
    case SET_DANCERS:
      state = action.dancers;
      break;
    case UPDATE_DANCER:
      state = state.map( dancer => dancer.id === action.dancer.id ? action.dancer : dancer);
      break;
    case DELETE_DANCER:
      state = [...state, action.dancer];
      break;
    case CREATE_DANCER:
      state = state.filter( dancer => dancer.id !== action.dancer.id);
      break;
  }
  return state;
};

//Thunk Creators
export const loadDancers = () => {
  return (dispatch) => {
    return axios.get('/api/dancers')
      .then( result => result.data)
      .then( dancers => dispatch({
        type: SET_DANCERS,
        dancers
      })
      );
  };
};

export const deleteDancer = ( dancer, history ) => {
  return (dispatch) => {
    return axios.delete(`/api/dancers/${dancer.id}`)
      .then(() => dispatch({
        type: DELETE_DANCER,
        dancer
      })
      )
      .then(() => {
        history.push('/dancers');
      });
  };
};

export const saveDancer = ( dancer, history ) => {
  if (dancer.id) {
    return (dispatch) => {
      return axios.put(`/api/dancers/${dancer.id}`, dancer)
        .then( result => result.data)
        .then( dancer => dispatch({
          type: UPDATE_DANCER,
          dancer
        })
        )
        .then(() => {
          if (history) {
            history.push(`/dancers/${dancer.id}`);
          }
        });
    };
  }
  return (dispatch) => {
    return axios.post('/api/dancers', dancer)
      .then( result => result.data)
      .then( dancer => dispatch({
        type: CREATE_DANCER,
        dancer
      })
      )
      .then(( data ) => {
        history.push(`/dancers/${data.dancer.id}`);
      });
  };
};
