import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App'
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
const RouterApp = withRouter(App)
ReactDOM.render(
  <Router>
    <RouterApp />
  </Router>,
  document.getElementById('root')
);


