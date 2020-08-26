import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'

import { getRepos } from 'api/githubAPI'
import { User } from './userSlice';
import { Error } from 'app/types';


// Repo search thunk
export const getReposThunk = createAsyncThunk<RepoJson, string, { rejectValue: Error }>(
  'repos/search',
  async (query: String) => {
    const response = await getRepos(query)
    return { ...response, query };
  }
)

interface RepoJson {
  data: {
    items: Array<Repo>
  }
  query: string
}

// name, author, stars and other statistics
export interface Repo {
  id: number
  name: string
  description: string
  stargazers_count: number
  watchers_count: number
  language: number
  forks_count: number
  owner: User
}

interface RepoState {
  error: Error | SerializedError | null
  repos: Array<Repo>
  query: string
  loading: 'idle' | 'pending' | 'succeeded' | 'failed' | 'empty'
}

const initialState: RepoState = {
  repos: Array<Repo>(),
  error: null,
  query: '',
  loading: 'idle'
}

const repos = createSlice({
  name: 'repos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getReposThunk.fulfilled, (state, { payload }) => {
      if (payload.data.items.length === 0) {
        state.loading = 'empty';  
      } else {
        state.repos = payload.data.items;
        state.loading = 'succeeded';
      }
      state.query = payload.query;
    })

    builder.addCase(getReposThunk.pending, (state) => {
      state.loading = 'pending';
    })

    builder.addCase(getReposThunk.rejected, (state, action) => {
      state.loading = 'failed';
      if (action.payload){
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
      
    })
  }
})

export default repos.reducer