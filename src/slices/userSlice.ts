import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'
import { Error } from '../app/types';
import { getUsers } from 'api/githubAPI'
import { RootState } from 'app/rootReducer';

// Repo search thunk
export const getUsersThunk = createAsyncThunk<PayLoadData, string, { rejectValue: Error }>(
  'users/search',
  async (query: String) => {
    const response = await getUsers(query)
    return { ...response, query }
  },
  {
    condition: (query: String, { getState }) => {
      const { users: {
        query: userQuery
      } } = getState() as RootState;
      if (query === userQuery) {
        return false;
      }
    }
  }
)

interface PayLoadData {
  data: {
    items: Array<User>
  }
  query: string
}

export interface User {
  id: number
  login: string
  repos_url: string
  avatar_url: string
  html_url: string
  url: string
}

interface UserState {
  error: Error | SerializedError | null
  query: string
  users: Array<User>
  loading: 'idle' | 'pending' | 'succeeded' | 'failed' | 'empty'
}

const initialState: UserState = {
  users: Array<User>(),
  query: '',
  error: null,
  loading: 'idle'
}

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsersThunk.fulfilled, (state, { payload }) => {
      if (payload.data.items.length === 0) {
        state.loading = 'empty';  
      } else {
        state.users = payload.data.items;
        state.loading = 'succeeded';
      }
      state.query = payload.query;
    })

    builder.addCase(getUsersThunk.pending, (state) => {
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