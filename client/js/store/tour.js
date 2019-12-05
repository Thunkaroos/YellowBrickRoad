import axios from "axios";

const GET_ALL_TOURS = "GET_ALL_TOURS";
const GET_TOUR = "GET_TOUR";
const GET_USERS_TOUR = "GET_USERS_TOUR";
const DESELECT_TOUR = "DESELECT_TOUR";
const POST_TOUR = "POST_TOUR";


const gotAllTours = tours => ({
  type: GET_ALL_TOURS,
  tours
});

const gotTour = tour => ({
  type: GET_TOUR,
  tour
});

const gotUsersTour = usersTour => ({
  type: GET_USERS_TOUR,
  usersTour
})

export const deselectTour = () => ({
  type: DESELECT_TOUR
});

const createTour = tour => ({
  type: POST_TOUR,
  tour
})



export const getAllTours = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`https://ar-guides.herokuapp.com/api/tours`);
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

export const getUsersTour = (id) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`https://ar-guides.herokuapp.com/api/tours/users/${id}`)
      dispatch(gotUsersTour(data))
    } catch (error) {
    console.log(error)
  }
}
}

export const postedTour = (name, description, startImg, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`https://ar-guides.herokuapp.com/api/tours`, {
        name,
        description,
        startImg,
        userId
      })
      dispatch(createTour(data))
    } catch (error) {
      
    }
  }
}


const initialState = {
  tours: [],
  selectedTour: {},
  usersTour: {}
}

const toursReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TOURS:
      return { ...state, tours: [...action.tours] };
    case GET_TOUR:
      return {...state, selectedTour: action.tour}
    case GET_USERS_TOUR:
      return {...state, usersTour: action.usersTour}
    case DESELECT_TOUR:
      return { ...state, selectedTour: {} };
    case POST_TOUR:
      return {...state, tours: [...state.tours, action.tour]}  
    default:
      return state;
  }
};

export default toursReducer;
