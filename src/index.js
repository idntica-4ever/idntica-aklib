import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import './index.css';
import App from './App';
import {ProductProvider} from './Context';
import {BrowserRouter as Router} from 'react-router-dom';

import Amplify from 'aws-amplify';
//import awsconfig from './aws-exports';

import config from './config';
import * as serviceWorker from './serviceWorker';

Amplify.configure ({
    Auth: {
        mandatorySignId: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
});

ReactDOM.render(
    <ProductProvider>
    <Router>
        <App />
    </Router>  
  </ProductProvider>,
    document.getElementById('root')
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
