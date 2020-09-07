// Module imports
import React from 'react';

// Component imports
import Tabs from '../Tabs/Tabs';
import TextEditor from '../Previews/TextEditor';

// CSS imports
import '../css/Tool/ToolMain.css';

const ToolMain = () => (

    <div className="ToolMain">

        <div className="ToolMainWindow">
            <Tabs tabType="tabs-profile">
                <div label="Profile 1"> 
                    <div>
                        <div className="form-group request-method-select">
                        <label>HTTP Method:</label>
                        <select className="form-control-sm">
                            <option>GET</option>
                            <option>POST</option>
                            <option>PUT</option>
                            <option>PATCH</option>
                            <option>DELETE</option>
                        </select>
                        </div>

                        <Tabs tabType="tabs-request">
                            <div label="Header">
                                <TextEditor />
                            </div>
                            <div label="Body">
                                <TextEditor />
                            </div>
                        </Tabs>

                        <Tabs tabType="tabs-response">
                            <div label="Header">
                                <TextEditor />
                            </div>
                            <div label="Body">
                                <TextEditor />
                            </div>
                        </Tabs>                        
                    </div>
                </div> 
                <div label="Profile 2"> 
                    <div>
                        <div className="form-group request-method-select">
                        <label>HTTP Method:</label>
                        <select className="form-control-sm">
                            <option>GET</option>
                            <option>POST</option>
                            <option>PUT</option>
                            <option>PATCH</option>
                            <option>DELETE</option>
                        </select>
                        </div>
                    </div>
                </div> 
            </Tabs> 
        </div>

    </div>

);

export default ToolMain;