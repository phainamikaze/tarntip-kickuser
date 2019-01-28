import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import config from './aws.config';
import Amplify , { Auth } from 'aws-amplify';
import * as serviceWorker from './serviceWorker';
Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: config.cognito.REGION,
		userPoolId: config.cognito.USER_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID
	},
	API: {
		endpoints: [
			{
				name: 'useronlineApi',
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION,
				custom_header: async () => {
					return { Authorization: (await Auth.currentSession()).idToken.jwtToken } 
				}
			}
		]
	}
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
