import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getRepos } from 'api/githubAPI'
import { User } from './userSlice';

interface RepoJson {
  data: {
    items: Array<Repo>
  }
}
// Repo search thunk
export const getReposThunk = createAsyncThunk<RepoJson,string>(
  'repos/search',
  async (q: String) => {
    const response = await getRepos(q)
    return response as RepoJson;
  }
)

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
  error: string | null
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

    builder.addCase(getReposThunk.pending, (state, { payload }) => {
      state.loading = 'pending';
    })
  }
})

export default repos.reducer