import React from 'react';

import '../css/Tool/ToolNav.css';

const ToolNav = ({homePath}) => (

    <div className="ToolNav">

        <ul>
            {/* Logo */}
            <li>
                <a href={homePath}>
                    <img src="/logo-nav.jpg" height="50px"/>
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
                        <a className="dropdown-item" href="#">Link 1</a>
                        <a className="dropdown-item" href="#">Link 2</a>
                        <a className="dropdown-item" href="#">Link 3</a>
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
                        <a className="dropdown-item" href="#">Link 1</a>
                        <a className="dropdown-item" href="#">Link 2</a>
                        <a className="dropdown-item" href="#">Link 3</a>
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