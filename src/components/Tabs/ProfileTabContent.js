// Module imports
import React from "react";
import HTTP from "../../http/http";

// Component imports
import Tabs from "./Tabs";
import TextEditor from "../Previews/TextEditor";

class ProfileTabContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {currentTab: props.currentTab};
        this.handleEditorChange = props.handleEditorChange;
        this.handleHttpChange = props.handleHttpChange;
        this.handleUrlChange = props.handleUrlChange;
    }

    componentWillReceiveProps(props) {
        this.setState({currentTab: props.currentTab});
    }

    handleSendClick = async (e) => {

        //Get the method

        //Get the URL

        //Get the request header

        //Get the request body

        //TODO: Add other options for an HTTP request. Get them here!!

        //Make request
        var http = new HTTP({}, {}, "GET", "https://api.github.com");
        await http.request();

        console.log(http.responseBody);
    }

    render() {
        return (
        <div className="tab-content">
            <div>
            <div className="tabs-content">
                    <div className="form-group request-method-select">
                        <label>HTTP Method:</label>
                        <select onChange={this.handleHttpChange} value={this.state.currentTab.httpMethod} className="form-control">
                            <option>GET</option>
                            <option>POST</option>
                            <option>PUT</option>
                            <option>PATCH</option>
                            <option>DELETE</option>
                        </select>
                    </div>
                    <div className="form-group request-url">
                        <input onChange={this.handleUrlChange} value={this.state.currentTab.url} type="text" className="form-control" placeholder="URL" name="url-input" />
                    </div>
                    <div className="form-group send-btn">
                        <button type="button" onClick={this.handleSendClick} className="btn btn-primary">SEND</button>
                    </div>
                    <br/>
                    <h4 id="request-header">Request</h4>
                    <h4 id="response-header">Response</h4>
                    <br/>
                    <Tabs tabType="tabs-request">
                        <div label="Header">
                            <TextEditor name="requestHeader" 
                                value={this.state.currentTab.requestHeader} 
                                mode={this.state.currentTab.requestHeaderMode} 
                                onValueChange={this.handleEditorChange} 
                                onModeChange={this.handleEditorChange}/>
                        </div>
                        <div label="Body">
                            <TextEditor name="requestBody" 
                                value={this.state.currentTab.requestBody} 
                                mode={this.state.currentTab.requestBodyMode} 
                                onValueChange={this.handleEditorChange} 
                                onModeChange={this.handleEditorChange}/>
                        </div>
                    </Tabs>
                    <Tabs tabType="tabs-response">
                        <div label="Header">
                            <TextEditor name="responseHeader" 
                                value={this.state.currentTab.responseHeader} 
                                mode={this.state.currentTab.responseHeaderMode} 
                                onValueChange={this.handleEditorChange} 
                                onModeChange={this.handleEditorChange}/>
                        </div>
                        <div label="Body">
                            <TextEditor name="responseBody"
                                value={this.state.currentTab.responseBody} 
                                mode={this.state.currentTab.responseBodyMode} 
                                onValueChange={this.handleEditorChange} 
                                onModeChange={this.handleEditorChange}/>
                        </div>
                    </Tabs>                        
            </div>
            </div>
        </div>
        )
    }
}

export default ProfileTabContent;