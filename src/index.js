import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import './index.css';
import 'sanitize.css/sanitize.css';
import WebFont from 'webfontloader';
import history from './history';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import configureStore from './configureStore';
import theme from './styles/theme';

WebFont.load({
  google: {
    families: ['Open Sans:300,400,600,700,800'],
  },
});

const initialState = {};
const store = configureStore(initialState, history);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
