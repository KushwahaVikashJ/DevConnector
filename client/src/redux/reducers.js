import { combineReducers } from 'redux'
import alertReducer from './alert/alertReducer'
import userReducer from './user/userReducer'
import profileReducer from './profile/profileReducer'
import postsReducer from './posts/postsReducer'

const reducers = combineReducers({
  alert: alertReducer,
  user: userReducer,
  profile: profileReducer,
  posts: postsReducer
})

export default reducers