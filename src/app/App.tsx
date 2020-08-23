import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from './rootReducer'

import './App.css'
import { SearchHeader } from 'components/SearchHeader'
import { Repo } from 'slices/reposSlice'
import { User } from 'slices/userSlice'

// name, author, stars and other statistics
interface ListProps {
  repos?: Repo[]
  users?: User[]
}

// export const SearchHeader = ({ labels, className }: IssueLabelsProps) => (
const List = ({ repos }: ListProps) => {
  return <div className="results">
    {repos && repos.map(repo => {
      return <div key={repo.id} className="result">
        <div className="repo-name">{repo.name}</div>
        <div className="repo-desc">{repo.description}</div>
        <span className="label">{repo.language}</span>
        <div className="repo-detail">
          <div className="center">🍴</div><div>{Intl.NumberFormat('en-US').format(repo.forks_count)}</div>
          <div className="center">⭐</div><div>{Intl.NumberFormat('en-US').format(repo.stargazers_count)}</div>
          <div className="center">👀</div><div>{Intl.NumberFormat('en-US').format(repo.watchers_count)}</div>
        </div>
      </div>
    })}
  </div>
}

const Loading = () => {
  return <div className="results">
    {[...Array(9).keys()].map(i => {
      return <div className="result loading"></div>
    })}
  </div>
}

const App: React.FC = () => {
  const [searchType, setSearchType] = useState('repos' as 'repos' | 'users');
  const [searchModeStatus, setSearchModeStatus] = useState('empty' as 'empty' | 'searching');
  
  const { repos, loading: repoLoading, error: repoError } = useSelector((state: RootState) => state.repos)
  const { users, loading: userLoading, error: userError } = useSelector((state: RootState) => state.users)

  return <div className="App">
    <SearchHeader searchType={searchType} setSearchType={setSearchType} 
    searchModeStatus={searchModeStatus} setSearchModeStatus={setSearchModeStatus} />

    {searchModeStatus === 'searching' && <>
      {searchType === 'repos' && repoLoading === 'succeeded' && <List repos={repos} />}
      {searchType === 'users' && repoLoading === 'succeeded' && <List users={users} />}
      {(repoLoading === 'pending' || userLoading === 'pending') && <Loading />}
    </>}
  </div>
}

export default App
