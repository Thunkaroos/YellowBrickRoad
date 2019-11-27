import axios from "axios";

const GET_ALL_TOURS = "GET_ALL_TOURS";
const GET_TOUR = "GET_TOUR";
const DESELECT_TOUR = "DESELECT_TOUR";

const gotAllTours = tours => ({
  type: GET_ALL_TOURS,
  tours
});

const gotTour = tour => ({
  type: GET_TOUR,
  tour
})

export const deselectTour = () => ({
  type: DESELECT_TOUR
})

export const getAllTours = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`http://10.0.0.163:3000/api/tours`)
      dispatch(gotAllTours(data)) 
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTour = (id) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`http://10.0.0.163:3000/api/tours/${id}`)
      dispatch(gotTour(data)) 
    } catch (error) {
      console.log(error)
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
      return {...state, tours: [...action.tours]}
    case GET_TOUR:
      return {...state, selectedTour: action.tour}
    case DESELECT_TOUR:
      return {...state, selectedTour: {}}
    default:
      return state;
  }
};

export default toursReducer;
