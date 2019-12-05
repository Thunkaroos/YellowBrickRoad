import axios from "axios";

const ADD_POINT = "ADD_POINT";
const DROP_POINT = "DROP_POINT";
const POST_POINTS = "POST_POINTS";
const UNDO_POINT = "UNDO_POINT";


export const dropPoint = () => ({
  type: DROP_POINT,
})

export const addPoint = point => ({
    type: ADD_POINT,
    point
})

const postPoints = point => ({
  type: POST_POINTS,
  point
})

export const postPoints = (points, stepNum, tourId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`https://ar-guides.herokuapp.com/api/points`, {
        points,
        stepNum,
        tourId
      })
      dispatch(postPoints(data))
    } catch (error) {
      
    }
  }
}

export const undoPoint = () => ({
  type: UNDO_POINT,
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
    case UNDO_POINT:
      return {...state, pointCount: state.pointCount - 1, points: state.points.slice(0, -1)}
    case POST_POINTS:
      return initialState
    default:
      return state;
  }
};

export default pointsReducer;
