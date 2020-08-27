import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { render } from '@testing-library/react';
import { store, persistor } from 'app/store';
import App from './app/App';

test('Renders the page properly', () => {
  const { getByText, getByTestId } = render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );

  expect(getByText(/Github Searcher/i)).toBeInTheDocument();
  expect(getByTestId(/search-input-box/i)).toBeInTheDocument();
});
