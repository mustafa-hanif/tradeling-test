import React, { useState, useEffect } from 'react'
import UserList from 'components/UserList';
import RepoList from 'components/RepoList';

import { SearchHeader } from 'components/SearchHeader'
import { useLocation } from 'react-router'

import './App.css'

const App: React.FC = () => {
  const [searchType, setSearchType] = useState('users' as 'repos' | 'users');
  const [searchModeStatus, setSearchModeStatus] = useState('empty' as 'empty' | 'searching');
  
  const location = useLocation();
  const newUrl = new URL(`${window.location.origin}${location.pathname}${location.search}`);
  useEffect(() => {
    if (newUrl.searchParams.has('userQuery')) {
      setSearchModeStatus('searching');
      setSearchType('users');
    }

    if (newUrl.searchParams.has('repoQuery')) {
      setSearchModeStatus('searching');
      setSearchType('repos');
    }
  }, [location.pathname, location.search, newUrl.searchParams]);

  let renderedList = null;
  if (searchModeStatus === 'searching') {
    if (searchType === 'repos') {
      renderedList = <RepoList />
    } else {
      renderedList = <UserList />
    }
  }

  const searchQuery = newUrl.searchParams.get('userQuery') || newUrl.searchParams.get('repoQuery');
  return <div className="App">
    <SearchHeader searchType={searchType} setSearchType={setSearchType} 
    searchModeStatus={searchModeStatus} setSearchModeStatus={setSearchModeStatus} />
    {searchQuery && <h2>Search results for: {searchQuery}</h2>}
    {renderedList}
  </div>
}

export default App
