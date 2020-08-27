import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { useHistory } from "react-router";
import EmptyResult from "./EmptyResult";
import Loading from "./Loading";
import ErrorReact from "./ErrorReact";

const UserList = () => {
  const { query, users, loading, error } = useSelector((state: RootState) => state.users);
  const history = useHistory();

  useEffect(() => {
    if (query) {
      const params = new URLSearchParams(window.location.search);
      params.delete('repoQuery');
      params.set('userQuery', query);
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
    {users.map(user => {
      return <div key={user.url} className="result" date-testid="result">
        <img className="avatar" src={user.avatar_url} alt={user.login} />
        <div className="repo-name">
          <a href={user.html_url} className="link" target="_blank" rel="noopener noreferrer">{user.login}</a>
        </div>
      </div>
    })}
  </div>
}

export default UserList;