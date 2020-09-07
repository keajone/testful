// React
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Components
import Home from './components/Home';
import TestTool from './components/Tool/TestTool';

// Styling
import './App.css';

// Route paths
// TODO: Is this the "React" way?
const HomePath = "/";
const TestToolPath = "/Test-Tool";

function App() {
  return (
    <Router>
      <div id="App">
        <Switch>
          <Route exact path={HomePath} component={Home} />
          <Route exact path={TestToolPath} component={TestTool} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
export {HomePath, TestToolPath}
