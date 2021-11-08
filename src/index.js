import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from './App';

const history = createBrowserHistory();

ReactDOM.render(
    <Router basename={process.env.PUBLIC_URL} history={history}>
        <App />
    </Router>,
    document.getElementById('root')
);
