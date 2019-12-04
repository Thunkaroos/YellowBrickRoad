import axios from "axios";

const ADD_POINT = "ADD_POINT";
const DROP_POINT = "DROP_POINT";


export const dropPoint = () => ({
  type: DROP_POINT,
})

export const addPoint = point => ({
    type: ADD_POINT,
    point
})

const initialState = {
  points: [[0, 0, -0.2]],
  pointCount: 1
}


const pointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POINT:
      return {...state, points: [...state.points, action.point]}
    case DROP_POINT:
      return {...state, pointCount: state.pointCount + 1}
    default:
      return state;
  }
};

export default pointsReducer;
