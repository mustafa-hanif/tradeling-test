import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from './rootReducer'

import './App.css'
import { SearchHeader } from 'components/SearchHeader'
import { Repo } from 'features/repoSearch/reposSlice'

// name, author, stars and other statistics
interface ListProps {
  repos: Repo[]
}

// export const SearchHeader = ({ labels, className }: IssueLabelsProps) => (
const List = ({ repos }: ListProps) => {
  return <div className="results">
    {repos.map(repo => {
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

const App: React.FC = () => {
  const { repos, loading: repoLoading, error } = useSelector((state: RootState) => state.repos)
  return <div className="App">
    <SearchHeader />
    {repoLoading === 'succeeded' && <List repos={repos} />}
  </div>
}


export default App
