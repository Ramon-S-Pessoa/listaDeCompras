import React, {
  Component
} from 'react';
import BuildList from './BuildList';
import "../sass/main.sass"

class App extends Component {
  render() {
    return ( 
      <div>
        <BuildList />
      </div>
    );
  }
}

export default App