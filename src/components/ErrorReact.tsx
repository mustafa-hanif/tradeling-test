import React from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { Error } from "app/types";

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

export default ErrorReact;