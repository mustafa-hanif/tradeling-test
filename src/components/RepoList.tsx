import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { useHistory } from "react-router";
import EmptyResult from "./EmptyResult";
import Loading from "./Loading";
import ErrorReact from "./ErrorReact";

const RepoList = () => {
  const { query, repos, loading, error } = useSelector((state: RootState) => state.repos);
  const history = useHistory();
  
  useEffect(() => {
    if (query) {
      const params = new URLSearchParams(window.location.search);
      params.set('repoQuery', query);
      params.delete('userQuery');
      history.push(decodeURIComponent(`${window.location.pathname}?${params}`));
    }
  }, [history, query]);
  
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

export default RepoList;