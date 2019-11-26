import axios from 'axios'


 const GET_ALL_TOURS = "GET_ALL_TOURS"

 const gotAllTours = tours => ({
  type: GET_ALL_TOURS,
  tours
})

export const getAllTours = dispatch => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`http://172.16.22.47:3000/api/tours`)
      dispatch(gotAllTours(data)) 
    } catch (error) {
      console.log(error)
    }
  }
}

// const initialState = {}

const initialState = {
  tours: [],
  singleTour: {}
}



const toursReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TOURS:
      return {...state, tours: [...action.tours]}
    default:
      return state  
  }
}

export default toursReducer