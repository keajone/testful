// React
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Components
import Home from './components/Home';
import TestTool from './components/Tool/TestTool';
import CreateNewCase from './components/Cases/CreateNewCase';
import ViewAllCases from './components/Cases/ViewAllCases';
import ViewCase from "./components/Cases/ViewCase";
import EditCase from "./components/Cases/EditCase";
import CreateNewSuite from './components/Suites/CreateNewSuite';
import ViewAllSuites from './components/Suites/ViewAllSuites';
import EditSuite from "./components/Suites/EditSuite";

// Styling
import './App.css';

// Route paths
// TODO: Is this the "React" way?
const HomePath = "/";
const TestToolPath = "/profiles";
const CreateNewCasePath = "/cases/new";
const ViewAllCasesPath = "/cases";
const EditCasePath = "/cases/edit";
const CreateNewSuitePath = "/suites/new";
const ViewAllSuitesPath = "/suites";
const EditSuitePath = "/suites/edit";

function App() {
  return (
    <Router>
      <div id="App">
        <Switch>

          {/** Home */}
          <Route exact path={HomePath} component={Home} />

          {/** Profiles */}
          {/** TODO: make profiles endpoint rather than 'TestToolPath' */}
          <Route exact path={TestToolPath} component={TestTool} />

          {/** Cases */}
          <Route exact path={CreateNewCasePath} component={CreateNewCase} />
          <Route exact path={ViewAllCasesPath} component={ViewAllCases}/>
          <Route exact path={ViewAllCasesPath+"/:id"} component={ViewCase} />
          <Route exact path={EditCasePath+"/:id"} component={EditCase} />

          {/** Suites */}
          <Route exact path={CreateNewSuitePath} component={CreateNewSuite} />
          <Route exact path={ViewAllSuitesPath} component={ViewAllSuites} />
          <Route exact path={EditSuitePath+"/:id"} component={EditSuite} />

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
  EditCasePath, 
  CreateNewSuitePath, 
  ViewAllSuitesPath,
  EditSuitePath
};
