import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PanelGoalsPage from './page/PanelGoalsPage';
import {ToastContainer, toast} from 'react-toastify';

import 'primeflex/primeflex.css';
import './App.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'react-toastify/dist/ReactToastify.css';

import PropTypes from 'prop-types';

const App = ({store}) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path= "/" component={PanelGoalsPage} />
      </Switch>
    </BrowserRouter>
    <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
  </Provider>
);

App.propTypes = {
  store: PropTypes.object
};
export default App;
