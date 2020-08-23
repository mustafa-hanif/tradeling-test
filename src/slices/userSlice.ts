import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUsers } from 'api/githubAPI'

// Repo search thunk
export const getUsersThunk = createAsyncThunk(
  'users/search',
  async (q: String) => {
    const response = await getUsers(q)
    return response
  }
)

// name, author, stars and other statistics
export interface User {
  login: string
  avatar_url: string
  type: string
  url: string
}

interface UserState {
  error: string | null
  users: Array<User>
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: UserState = {
  users: Array<User>(),
  error: null,
  loading: 'idle'
}

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsersThunk.fulfilled, (state, { payload }) => {
      console.log(payload.data)
      state.users = payload.data;
      state.loading = 'succeeded';
    })

    builder.addCase(getUsersThunk.pending, (state, { payload }) => {
      state.loading = 'pending';
    })
  }
})

export default users.reducer