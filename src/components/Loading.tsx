import React from "react";
const Loading = () => {
  return <div className="results">
    {[...Array(9).keys()].map(i => {
      return <div className="result loading"></div>
    })}
  </div>
}

export default Loading;