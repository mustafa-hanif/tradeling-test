import React from "react";
const Loading = () => {
  return <div className="results">
    {[...Array(9).keys()].map(i => {
      return <div key={i} className="result loading"></div>
    })}
  </div>
}

export default Loading;