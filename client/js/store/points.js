import axios from "axios";

const ADD_POINT = "ADD_POINT";
// const GET_TOUR = "GET_TOUR";
// const GET_USERS_TOUR = "GET_USERS_TOUR";
// const DESELECT_TOUR = "DESELECT_TOUR";

// const gotAllTours = tours => ({
//   type: GET_ALL_TOURS,
//   tours
// });

export const addPoint = point => ({
    type: ADD_POINT,
    point
})

// const gotTour = tour => ({
//   type: GET_TOUR,
//   tour
// });

// const gotUsersTour = usersTour => ({
//   type: GET_USERS_TOUR,
//   usersTour
// })

// export const deselectTour = () => ({
//   type: DESELECT_TOUR
// });

// export const getAllTours = () => {
//   return async dispatch => {
//     try {
//       const { data } = await axios.get(`https://ar-guides.herokuapp.com/api/tours`);
//       dispatch(gotAllTours(data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// export const getTour = id => {
//   return async dispatch => {
//     try {
//       const { data } = await axios.get(
//         `https://ar-guides.herokuapp.com/api/tours/${id}`
//       );
//       dispatch(gotTour(data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// export const getUsersTour = (id) => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.get(`https://ar-guides.herokuapp.com/api/tours/users/${id}`)
//       dispatch(gotUsersTour(data))
//     } catch (error) {
//     console.log(error)
//   }
// }
// }

// const initialState = {
//   points: [],
//   selectedTour: {},
//   usersTour: {}
// }


const pointsReducer = (points = [[0, 0, -1]], action) => {
  switch (action.type) {
    case ADD_POINT:
      return [...points, action.point];
    // case GET_TOUR:
    //   return {...state, selectedTour: action.tour}
    // case GET_USERS_TOUR:
    //   return {...state, usersTour: action.usersTour}

    // case DESELECT_TOUR:
    //   return { ...state, selectedTour: {} };
    default:
      return points;
  }
};

export default pointsReducer;
