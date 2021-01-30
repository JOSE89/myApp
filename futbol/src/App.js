import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'primeflex/primeflex.css';
import './App.css';
import PanelGoalsPage from './page/PanelGoalsPage';
import PropTypes from 'prop-types';

const App = ({store}) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path= "/" component={PanelGoalsPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};
export default App;
