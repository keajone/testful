import React from 'react';

import '../css/Tool/ToolNav.css';

const ToolNav = ({homePath}) => (

    <div className="ToolNav">

        <ul>
            {/* Logo */}
            <li>
                <a href={homePath}>
                    <img src="/logo-nav.jpg" height="50px" alt="Home"/>
                </a>
            </li>

            {/* Start collapsable content */}

            {/* Create test cases */}
            <li className="dropdown-container">
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        Create Test Case
                    </button>
                    <div className="dropdown-menu">
                        <button className="dropdown-item">Link 1</button>
                        <button className="dropdown-item">Link 2</button>
                        <button className="dropdown-item">Link 3</button>
                    </div>
                </div>
            </li>

            {/* Create test suites */}
            <li className="dropdown-container">
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        Create Test Suite
                    </button>
                    <div className="dropdown-menu">
                        <button className="dropdown-item">Link 1</button>
                        <button className="dropdown-item">Link 2</button>
                        <button className="dropdown-item">Link 3</button>
                    </div>
                </div>
            </li>

            {/* Home link */}
            <li>
                <a type="button" className="btn btn-primary" href={homePath}>Home</a>
            </li>

        </ul>

    </div>

);

export default ToolNav;