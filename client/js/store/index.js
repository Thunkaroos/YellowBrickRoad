import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleWare from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'
import toursReducer from './tour'

const rootReducer = combineReducers({
  tours: toursReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleWare, createLogger({collapsed: true}))
)

const store = createStore(rootReducer, middleware)


export default store
