import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from './rootReducer'

import './App.css'
import { SearchHeader } from 'components/SearchHeader'
import { Error } from './types'
import { SerializedError } from '@reduxjs/toolkit'

const Loading = () => {
  return <div className="results">
    {[...Array(9).keys()].map(i => {
      return <div className="result loading"></div>
    })}
  </div>
}

const EmptyResult = () => {
  return <div>
    <h4>We couldn't find any data for this search query, perhaps try a different search phrase</h4>
  </div>
}

interface ErrorProp {
  error: Error | SerializedError | null
}

const ErrorReact = ({ error }: ErrorProp) => {
  return <div className="error">
    <h5>Error</h5>
    <div>{(error as Error)?.message}</div>
    <div>{(error as Error)?.documentation_url}</div>
    <a href="/">Click here to reload the page in an attempt to recover from the error</a>
  </div>
}

const App: React.FC = () => {
  const [searchType, setSearchType] = useState('users' as 'repos' | 'users');
  const [searchModeStatus, setSearchModeStatus] = useState('empty' as 'empty' | 'searching');
  
  let renderedList = null;
  if (searchModeStatus === 'searching') {
    if (searchType === 'repos') {
      renderedList = <RepoList />
    } else {
      renderedList = <UserList />
    }
  }

  return <div className="App">
    <SearchHeader searchType={searchType} setSearchType={setSearchType} 
    searchModeStatus={searchModeStatus} setSearchModeStatus={setSearchModeStatus} />

    {renderedList}
  </div>
}

// export const SearchHeader = ({ labels, className }: IssueLabelsProps) => (
const RepoList = () => {
  const { repos, loading, error } = useSelector((state: RootState) => state.repos);

  if (loading === 'pending') {
    return <Loading />
  }

  if (loading === 'failed') {
    return <ErrorReact error={error} />
  }

  if (loading === 'empty') {
    return <EmptyResult />
  }

  return <div className="results">
    {repos.map(repo => {
      return <div key={repo.id} className="result">
        <div className="repo-name">{repo.name}</div>
        <div className="repo-desc">{repo.description}</div>
        <span className="label">{repo.language}</span>
        <div className="repo-detail">
          <span role="img" aria-label="forks" className="center">🍴</span>
          <div>{Intl.NumberFormat('en-US').format(repo.forks_count)}</div>
          <span role="img" aria-label="stars" className="center">⭐</span>
          <div>{Intl.NumberFormat('en-US').format(repo.stargazers_count)}</div>
          <span role="img" aria-label="watchers" className="center">👀</span>
          <div>{Intl.NumberFormat('en-US').format(repo.watchers_count)}</div>
        </div>
      </div>
    })}
  </div>
}

const UserList = () => {
  const { query, users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (query) {
      const params = new URLSearchParams(window.location.search);
      params.set('query', query);
      window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?${params}`));
    }
  }, [query]);

  if (loading === 'pending') {
    return <Loading />
  }

  if (loading === 'failed') {
    return <ErrorReact error={error} />
  }

  if (loading === 'empty') {
    return <EmptyResult />
  }

  return <div className="results">
    {users.map(user => {
      return <div key={user.url} className="result">
        <img className="avatar" src={user.avatar_url} alt={user.login} />
        <div className="repo-name">
          <a href={user.url} className="link" target="_blank" rel="noopener noreferrer">{user.login}</a>
        </div>
      </div>
    })}
  </div>
}

export default App
