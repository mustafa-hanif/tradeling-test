import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'
import { Error } from '../app/types';
import { getUsers } from 'api/githubAPI'

// Repo search thunk
export const getUsersThunk = createAsyncThunk<PayLoadData, string, { rejectValue: Error }>(
  'users/search',
  async (q: String) => {
    const response = await getUsers(q)
    return response
  }
)

interface PayLoadData {
  data: {
    items: Array<User>
  }
}

export interface User {
  id: number
  login: string
  repos_url: string
  avatar_url: string
  url: string
}

interface UserState {
  error: Error | SerializedError | null
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
      console.log(payload.data.items[0]);
      state.users = payload.data.items;
      state.loading = 'succeeded';
    })

    builder.addCase(getUsersThunk.pending, (state, { payload }) => {
      state.loading = 'pending';
    })

    builder.addCase(getUsersThunk.rejected, (state, action) => {
      state.loading = 'failed';
      if (action.payload){
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
      
    })
  }
})

export default users.reducer