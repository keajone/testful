import React from 'react';
import {} from 'react-router-dom';

import {HomePath} from '../../App';
import ToolNav from './ToolNav';
import ToolMain from './ToolMain';

import '../css/Tool/TestTool.css';

function TestTool() {

    return (

        <div className="test-tool-container">

            <ToolNav homePath={HomePath}/>
            <ToolMain />

        </div>
    );
}

export default TestTool;