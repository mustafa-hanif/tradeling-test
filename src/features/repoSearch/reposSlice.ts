import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '../../app/store'

import { RepoDetails, getRepos } from '../../api/githubAPI'

interface RepoJson {
  items: Array<Repo>
}
// Repo search thunk
export const getReposThunk: any = createAsyncThunk<RepoJson,string>(
  'repos/search',
  async (q: String) => {
    const response = await getRepos(q)
    return response as RepoJson;
  }
)

interface Owner {
  login: string
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
  owner: Owner
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
  }
})

export default repos.reducer