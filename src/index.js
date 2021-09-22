import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../src/Store'
import 'bootstrap/dist/css/bootstrap.min.css';   
import "bootstrap/dist/css/bootstrap.css";
// import "now-ui-dashboard/assets/css/now-ui-dashboard.css";
import './index.css'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
