/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { getReposThunk } from 'slices/reposSlice';
import { getUsersThunk } from 'slices/userSlice';

interface SearchProps {
  searchType: 'repos' | 'users'
  searchModeStatus: 'empty' | 'searching'
  setSearchType: Function
  setSearchModeStatus: Function
}

// export const SearchHeader = ({ labels, className }: IssueLabelsProps) => (

type InputEvent = ChangeEvent<HTMLInputElement>
type SelectEvent = ChangeEvent<HTMLSelectElement>
type SelectChangeHandler = (e: SelectEvent) => void

type InputChangeHandler = (e: InputEvent) => void

// Debounced function so only triggers if user has written something
const debouncedSearch = debounce((value: string, searchTypeGiven: string, performSearch) => {
  performSearch(value, searchTypeGiven);
}, 1000, { trailing: true });

export const SearchHeader = ({ searchType, setSearchType, searchModeStatus, setSearchModeStatus }: SearchProps) => {
  const [searchString, setSearchString] = useState('');
  const dispatch = useDispatch();

  // The function which actually performs the search
  const performSearch = (value: string, searchTypeGiven: string) => {
    if (searchTypeGiven === 'users') {
      dispatch(getUsersThunk(value));
    } else {
      dispatch(getReposThunk(value));
    }
  }

  useEffect(() => {
    // Perform a search if there are more than 2 characters
    if (searchString.length > 2) {
      debouncedSearch(searchString, searchType, performSearch);
      
      // Set the position of the search box based on where we are searching
      if (searchModeStatus === 'empty') {
        setSearchModeStatus('searching')
      }
    } else if (searchString.length === 0) {
      if (searchModeStatus === 'searching') {
        setSearchModeStatus('empty')
      }
    }
  }, [searchString, searchType]);

  const onSearchOptionChange: SelectChangeHandler = e => {
    if (searchType !== e.target.value) {
      setSearchType(e.target.value);
    }
  }

  const onQueryChange: InputChangeHandler = e => {
    setSearchString(e.target.value);
  }

  let animationClass = 'animation';
  if (searchModeStatus === 'searching') {
    animationClass = `${animationClass} animation-top`;
  }
  return <div className={animationClass}>
    <header className="header">
      <img className="logo" src="github_logo.png" alt="Github Logo" />
      <h1 className="heading">Github Searcher</h1>
      <h2 className="subheading">Search users or repositories below</h2>
      <input className="search" type="text" data-testid="search-input-box" placeholder="Start typing to search ..." onChange={onQueryChange} />
      <select className="select" onChange={onSearchOptionChange} value={searchType}>
        <option value="users">Users</option>
        <option value="repos">Repositories</option>
      </select>
    </header>
  </div>
}
