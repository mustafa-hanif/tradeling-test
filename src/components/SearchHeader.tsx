import React, { useState, ChangeEvent } from 'react';
import debounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux';
import { getReposThunk, Repo } from 'features/repoSearch/reposSlice';
// import classnames from 'classnames'

// interface ListProps {
//   repos: Repo[]
// }

// export const SearchHeader = ({ labels, className }: IssueLabelsProps) => (

type InputEvent = ChangeEvent<HTMLInputElement>
type SelectEvent = ChangeEvent<HTMLSelectElement>
type SelectChangeHandler = (e: SelectEvent) => void

type InputChangeHandler = (e: InputEvent) => void

export const SearchHeader = () => {
  const dispatch = useDispatch();
  const [searchType, setSearchType] = useState('repos');
  const [searchModeStatus, setSearchModeStatus] = useState('empty');
  const onSearchOptionChange: SelectChangeHandler = e => {
    setSearchType(e.target.value);
  }

  const debouncedSearch = debounce((value: string) => {
    if (searchType === 'users') {

    } else {
      dispatch(getReposThunk(value));
    }
  }, 300);
  const onQueryChange: InputChangeHandler = e => {
    if (e.target.value.length > 2) {
      debouncedSearch(e.target.value);
      // debouncedSearch(e)
      if (searchModeStatus === 'empty') {
        setSearchModeStatus('searching')
      }
    } else if (e.target.value.length === 0) {
      if (searchModeStatus === 'searching') {
        setSearchModeStatus('empty')
      }
    }
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
      <input className="search" type="text" placeholder="Start typing to search ..." onChange={onQueryChange} />
      <select className="select" onChange={onSearchOptionChange} value={searchType}>
        <option value="users">Users</option>
        <option value="repos">Repositories</option>
      </select>
    </header>
  </div>
}
