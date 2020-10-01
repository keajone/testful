import React from 'react';

import Error from "../ErrorHandling/Error";

import '../css/Tool/ToolNav.css';

import { 
    HomePath,
    CreateNewCasePath, 
    ViewAllCasesPath, 
    CreateNewSuitePath, 
    ViewAllSuitesPath,
    TestToolPath,
} from '../../App';

const ToolNav = () => (

    <div className="ToolNav">

        <ul>
            {/* Logo */}
            <li>
                <a href={HomePath}>
                    <img src="/logo-nav.jpg" height="50px" alt="Home"/>
                </a>
            </li>

            {/* Start collapsable content */}

            {/* Create test cases */}
            <li className="dropdown-container">
                <a type="button" className="btn btn-primary" href={TestToolPath}>Profiles</a>                  
            </li>

            {/* Create test cases */}
            <li className="dropdown-container">
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        Test Cases
                    </button>
                    <div className="dropdown-menu">
                        <a href={CreateNewCasePath} className="dropdown-item">Create New</a>
                        <a href={ViewAllCasesPath} className="dropdown-item">View All</a>
                        {/* <button className="dropdown-item">Link 3</button> */}
                    </div>
                </div>
            </li>

            {/* Create test suites */}
            <li className="dropdown-container">
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        Test Suites
                    </button>
                    <div className="dropdown-menu">
                        <a href={CreateNewSuitePath} className="dropdown-item">Create New</a>
                        <a href={ViewAllSuitesPath} className="dropdown-item">View All</a>
                        {/* <button className="dropdown-item">Link 3</button> */}
                    </div>
                </div>
            </li>

            {/* Home link */}
            <li>
                <a type="button" className="btn btn-primary" href={HomePath}>Home</a>
            </li>

        </ul>

        <Error />

    </div>

);

export default ToolNav;