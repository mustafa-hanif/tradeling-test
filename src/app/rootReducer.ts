import { combineReducers } from '@reduxjs/toolkit'

import repoDetailsReducer from '../features/repoSearch/reposSlice'

const rootReducer = combineReducers({
  repos: repoDetailsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
