import { combineReducers } from '@reduxjs/toolkit'

import repoReducer from 'slices/reposSlice';
import userReducer from 'slices/userSlice';

const rootReducer = combineReducers({
  repos: repoReducer,
  users: userReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
