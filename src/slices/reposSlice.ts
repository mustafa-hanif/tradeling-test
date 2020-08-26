import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'

import { getRepos } from 'api/githubAPI'
import { User } from './userSlice';
import { Error } from 'app/types';


// Repo search thunk
export const getReposThunk = createAsyncThunk<RepoJson, string, { rejectValue: Error }>(
  'repos/search',
  async (q: String) => {
    const response = await getRepos(q)
    return response as RepoJson;
  }
)

interface RepoJson {
  data: {
    items: Array<Repo>
  }
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
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: RepoState = {
  repos: Array<Repo>(),
  error: null,
  loading: 'idle'
}

const repos = createSlice({
  name: 'repos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getReposThunk.fulfilled, (state, { payload }) => {
      state.repos = payload.data.items;
      state.loading = 'succeeded';
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