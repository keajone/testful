// Module imports
import React from "react";
import uuid from "uuid";

// Component imports
import Tabs from "./Tabs";
import TextEditor from "../Previews/TextEditor";

class ProfileTabs extends React.Component {

  counter = 2;

  state = {
    tabs: [
      // default profile
      { id: 1, 
        name: "Profile 1", 
        httpMethod: "GET",
        url: "",
        requestHeader: "// JSON",
        requestBody: "// JSON",
        responseHeader: "// JSON",
        responseBody: "// JSON",
        requestHeaderMode: "javascript",
        requestBodyMode: "javascript",
        responseHeaderMode: "javascript",
        responseBodyMode: "javascript",
      },
    ],
    currentTab: {   
        id: 1, 
        name: "Profile 1", 
        httpMethod: "GET",
        url: "",
        requestHeader: "// JSON",
        requestBody: "// JSON",
        responseHeader: "// JSON",
        responseBody: "// JSON",
        requestHeaderMode: "javascript",
        requestBodyMode: "javascript",
        responseHeaderMode: "javascript",
        responseBodyMode: "javascript",
    },
  };

  createTabs = () => {
    const { tabs, currentTab } = this.state;

    const allTabs = tabs.map(tab => {
      return (
        <li className={currentTab.id === tab.id ? "tab active" : "tab"}>
        <label
            onClick={() => this.handleSelectTab(tab)}>
            {tab.name}
        </label>
        <button onClick={() => this.handleDeleteTab(tab)} 
            type="button" className="close delete-btn" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </li>
      );
    });

    return (
        <ul className="nav nav-tabs">{allTabs}
        <li className="add-tab-li" onClick={this.handleAddTab}>
        +
        </li></ul>
    );
  };

  // Handler for changing the select HTTP method.
  handleHttpChange = e => {
    const { tabs, currentTab } = this.state;
    const updatedTabs = tabs.map(tab => {
      if (tab.name === currentTab.name) {
        return {
          ...tab,
          httpMethod: e.target.value
        };
      } else {
        return tab;
      }
    });
    this.setState({
      tabs: updatedTabs,
      currentTab: {
        ...currentTab,
        httpMethod: e.target.value
      }
    });
  };

  // Handler for changing the URL.
  handleUrlChange = e => {
    const { tabs, currentTab } = this.state;
    const updatedTabs = tabs.map(tab => {
      if (tab.name === currentTab.name) {
        return {
          ...tab,
          url: e.target.value
        };
      } else {
        return tab;
      }
    });
    this.setState({
      tabs: updatedTabs,
      currentTab: {
        ...currentTab,
        url: e.target.value
      }
    });
  };

  // Handler for changing text editor info (value/mode).
  // WARNING: this function is messy in order to modify the correct state element.
  handleEditorChange = (value, type, element) => {
    const { tabs, currentTab } = this.state;
    const updatedTabs = tabs.map(tab => {
      if (tab.name === currentTab.name) {
        if (type === "value")
        {
            if (element === "requestHeader") { return { ...tab, requestHeader: value }; }
            else if (element === "requestBody") { return { ...tab, requestBody: value }; }
            else if (element === "responseHeader") { return { ...tab, responseHeader: value }; }
            else if (element === "responseBody") { return { ...tab, responseBody: value }; }
        } 
        else if (type === "mode")
        {
            if (element === "requestHeader") { return { ...tab, requestHeaderMode: value }; }
            else if (element === "requestBody") { return { ...tab, requestBodyMode: value }; }
            else if (element === "responseHeader") { return { ...tab, responseHeaderMode: value }; }
            else if (element === "responseBody") { return { ...tab, responseBodyMode: value }; }
        }
      } else {
        return tab;
      }
    });
    if (type === "value")
    {
        if (element === "requestHeader") { this.setState({ tabs: updatedTabs, currentTab: { ...currentTab, requestHeader: value }}); }
        else if (element === "requestBody") { this.setState({ tabs: updatedTabs, currentTab: { ...currentTab, requestBody: value }}); }
        else if (element === "responseHeader") { this.setState({ tabs: updatedTabs, currentTab: { ...currentTab, responseHeader: value }}); }
        else if (element === "responseBody") { this.setState({ tabs: updatedTabs, currentTab: { ...currentTab, responseBody: value }}); }
    } 
    else if (type === "mode")
    {
        if (element === "requestHeader") { this.setState({ tabs: updatedTabs, currentTab: { ...currentTab, requestHeaderMode: value }}); }
        else if (element === "requestBody") { this.setState({ tabs: updatedTabs, currentTab: { ...currentTab, requestBodyMode: value }}); }
        else if (element === "responseHeader") { this.setState({ tabs: updatedTabs, currentTab: { ...currentTab, responseHeaderMode: value }}); }
        else if (element === "responseBody") { this.setState({ tabs: updatedTabs, currentTab: { ...currentTab, responseBodyMode: value }}); }
    }
  };

  handleSelectTab = tab => {
    this.setState({
      currentTab: tab,
    });
  };

  handleAddTab = () => {
    const { tabs } = this.state;

    const newTabObject =
      { id: uuid(), 
        name: `Profile ${this.counter}`, 
        httpMethod: "GET",
        url: "",
        requestHeader: "// JSON",
        requestBody: "// JSON",
        responseHeader: "// JSON",
        responseBody: "// JSON",
        requestHeaderMode: "javascript",
        requestBodyMode: "javascript",
        responseHeaderMode: "javascript",
        responseBodyMode: "javascript",
    };
    this.counter += 1;

    this.setState({
      tabs: [...tabs, newTabObject],
      currentTab: newTabObject,
    });
  };

  handleDeleteTab = tabToDelete => {
    const { tabs } = this.state;
    const tabToDeleteIndex = tabs.findIndex(tab => tab.id === tabToDelete.id);

    const updatedTabs = tabs.filter((tab, index) => {
      return index !== tabToDeleteIndex;
    });

    const previousTab =
      tabs[tabToDeleteIndex - 1] || tabs[tabToDeleteIndex + 1] || {};

    this.setState({
      tabs: updatedTabs,
      currentTab: previousTab
    });
  };

  render() {
    const { currentTab } = this.state;
    return (
      <div className="container">
        <div className="well">
          
          {this.createTabs()}
          <div className="tab-content">
              <div>

                <div className="tabs-content">
                        <div className="form-group request-method-select">
                            <label>HTTP Method:</label>
                            <select onChange={this.handleHttpChange} value={currentTab.httpMethod} className="form-control">
                                {console.log(currentTab.httpMethod === "GET")}
                                <option>GET</option>
                                <option>POST</option>
                                <option>PUT</option>
                                <option>PATCH</option>
                                <option>DELETE</option>
                            </select>
                        </div>

                        <div className="form-group request-url">
                            <input onChange={this.handleUrlChange} value={currentTab.url} type="text" className="form-control" placeholder="URL" name="url-input" />
                        </div>
                        
                        <div className="form-group send-btn">
                            <button type="button" className="btn btn-primary">SEND</button>
                        </div>

                        <br/>

                        <h4 id="request-header">Request</h4>
                        <h4 id="response-header">Response</h4>
                        <br/>
                        <Tabs tabType="tabs-request">
                            <div label="Header">
                                <TextEditor name="requestHeader" 
                                    value={currentTab.requestHeader} 
                                    mode={currentTab.requestHeaderMode} 
                                    onValueChange={this.handleEditorChange} 
                                    onModeChange={this.handleEditorChange}/>
                            </div>
                            <div label="Body">
                                <TextEditor name="requestBody" 
                                    value={currentTab.requestBody} 
                                    mode={currentTab.requestBodyMode} 
                                    onValueChange={this.handleEditorChange} 
                                    onModeChange={this.handleEditorChange}/>
                            </div>
                        </Tabs>

                        
                        <Tabs tabType="tabs-response">
                            <div label="Header">
                                <TextEditor name="responseHeader" 
                                    value={currentTab.responseHeader} 
                                    mode={currentTab.responseHeaderMode} 
                                    onValueChange={this.handleEditorChange} 
                                    onModeChange={this.handleEditorChange}/>
                            </div>
                            <div label="Body">
                                <TextEditor name="responseBody"
                                    value={currentTab.responseBody} 
                                    mode={currentTab.responseBodyMode} 
                                    onValueChange={this.handleEditorChange} 
                                    onModeChange={this.handleEditorChange}/>
                            </div>
                        </Tabs>                        
                    </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTabs;