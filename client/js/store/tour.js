import axios from "axios";
import postPoints from './points';

const GET_ALL_TOURS = "GET_ALL_TOURS";
const GET_TOUR = "GET_TOUR";
const DESELECT_TOUR = "DESELECT_TOUR";
const ADD_TOUR = "ADD_TOUR";


const gotAllTours = tours => ({
  type: GET_ALL_TOURS,
  tours
});

const gotTour = tour => ({
  type: GET_TOUR,
  tour
});

export const deselectTour = () => ({
  type: DESELECT_TOUR
});

const addTour = tour => ({
  type: ADD_TOUR,
  tour
})

export const getAllTours = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `https://ar-guides.herokuapp.com/api/tours`
      );
      dispatch(gotAllTours(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTour = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `https://ar-guides.herokuapp.com/api/tours/${id}`
      );
      dispatch(gotTour(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const postTour = (name, description, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`http://172.16.22.47:3001/api/tours`, {
      // const {data} = await axios.post(`https://ar-guides.herokuapp.com/api/tours`, {
        name,
        description,
        // startImg,
        userId
      })
      dispatch(addTour(data))
      return data
    } catch (error) {
      console.log(error.response.data);
    }
  }
}


const initialState = {
  tours: [],
  selectedTour: {}
}

const toursReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TOURS:
      return { ...state, tours: [...action.tours] };
    case GET_TOUR:
      return { ...state, selectedTour: action.tour };
    case DESELECT_TOUR:
      return { ...state, selectedTour: {} };
    case ADD_TOUR:
      return {...state, tours: [...state.tours, action.tour]}  
    default:
      return state;
  }
};

export default toursReducer;
