import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleWare from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'
import toursReducer from './tour'
import userReducer from './user'
import pointsReducer from './points'

const rootReducer = combineReducers({
  tours: toursReducer,
  user: userReducer,
  points: pointsReducer,
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleWare, createLogger({collapsed: true}))
)

const store = createStore(rootReducer, middleware)


export default store
