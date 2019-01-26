import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import OnlineList from './components/OnlineList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <OnlineList/>
      </div>
    );
  }
}
export default withAuthenticator(App);
