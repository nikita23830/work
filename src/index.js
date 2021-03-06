import React from 'react';
import { render } from "react-dom";
import App from './App';
import './index.css';
import { SnackbarProvider } from 'notistack';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route'
import Auth from 'Comp/Auth'

render(
  <SnackbarProvider maxSnack={5} >
    <Router>
      <Route path='/' component={App} />
    </Router>
  </SnackbarProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
