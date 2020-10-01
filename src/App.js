// React
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Components
import Home from './components/Home';
import TestTool from './components/Tool/TestTool';
import CreateNewTask from './components/Cases/CreateNewCase';
import ViewAllTasks from './components/Cases/ViewAllCases';
import CreateNewSuite from './components/Suites/CreateNewSuite';
import ViewAllSuites from './components/Suites/ViewAllSuites';

// Styling
import './App.css';

// Route paths
// TODO: Is this the "React" way?
const HomePath = "/";
const TestToolPath = "/Tool";
const CreateNewCasePath = "/New/Case";
const ViewAllCasesPath = "/Cases";
const CreateNewSuitePath = "/New/Suite";
const ViewAllSuitesPath = "/Suites";

function App() {
  return (
    <Router>
      <div id="App">
        <Switch>
          <Route exact path={HomePath} component={Home} />
          <Route exact path={TestToolPath} component={TestTool} />
          <Route exact path={CreateNewCasePath} component={CreateNewTask} />
          <Route exact path={ViewAllCasesPath} component={ViewAllTasks} />
          <Route exact path={CreateNewSuitePath} component={CreateNewSuite} />
          <Route exact path={ViewAllSuitesPath} component={ViewAllSuites} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
export {
  HomePath, 
  TestToolPath, 
  CreateNewCasePath, 
  ViewAllCasesPath, 
  CreateNewSuitePath, 
  ViewAllSuitesPath
};
