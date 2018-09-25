import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Here } from '../../src';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <center>
        <h3>Default</h3>
        <Here
          ref={'normal'}
          platform={{
            appId: 'oaKW6sloxzQwSMxJfGYn',
            appCode: 'vrZz_m5kSOc9dFU_F83Zrg'
          }}
        />

        <h3>Traffic</h3>
        <Here
          ref={'traffic'}
          platform={{
            appId: 'oaKW6sloxzQwSMxJfGYn',
            appCode: 'vrZz_m5kSOc9dFU_F83Zrg'
          }}

          traffic={true}
          zoom={15}
        />

        <h3>incidents</h3>
        <Here
          ref={'traffic'}
          platform={{
            appId: 'oaKW6sloxzQwSMxJfGYn',
            appCode: 'vrZz_m5kSOc9dFU_F83Zrg'
          }}

          traffic={true}
          zoom={10}
          incidents={true}
        />
      </center>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('content'));
