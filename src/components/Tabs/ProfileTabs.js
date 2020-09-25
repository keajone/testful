// Module imports
import React from "react";
import uuid from "uuid";

// Component imports
import Content from './ProfileTabContent';

class ProfileTabs extends React.Component {

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
    counter: 1,
  };

  // Renders all the tabs as well as a 'plus' to add another tab profile.
  createTabs = () => {
    const { tabs, currentTab } = this.state;

    const allTabs = tabs.map(tab => {
      return (
        <li className={currentTab.id === tab.id ? "tab active" : "tab"} key={tab.id}>
        <label
            onClick={() => this.handleSelectTab(tab)}>
            {tab.name}
        </label>
        <button onClick={() => this.handleDeleteTab(tab)} 
            type="button" className="close delete-btn" aria-label="Close">
            &times;
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
    const newState = {
      tabs: updatedTabs,
      currentTab: {
        ...currentTab,
        httpMethod: e.target.value
      },
      counter: this.state.counter,
    }
    this.setState(newState);
    localStorage.setItem('profiles',JSON.stringify(newState));
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
    const newState = {
      tabs: updatedTabs,
      currentTab: {
        ...currentTab,
        url: e.target.value
      },
      counter: this.state.counter,
    }
    this.setState(newState);
    localStorage.setItem('profiles',JSON.stringify(newState));
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
      return {}; // gets rid of warning message, shouldnt execute though.
    });
    var newState;
    if (type === "value")
    {
        if (element === "requestHeader") { newState = { tabs: updatedTabs, currentTab: { ...currentTab, requestHeader: value }}; }
        else if (element === "requestBody") { newState = { tabs: updatedTabs, currentTab: { ...currentTab, requestBody: value }}; }
        else if (element === "responseHeader") { newState = { tabs: updatedTabs, currentTab: { ...currentTab, responseHeader: value }}; }
        else if (element === "responseBody") { newState = { tabs: updatedTabs, currentTab: { ...currentTab, responseBody: value }}; }
    } 
    else if (type === "mode")
    {
        if (element === "requestHeader") { newState = { tabs: updatedTabs, currentTab: { ...currentTab, requestHeaderMode: value }}; }
        else if (element === "requestBody") { newState = { tabs: updatedTabs, currentTab: { ...currentTab, requestBodyMode: value }}; }
        else if (element === "responseHeader") { newState = { tabs: updatedTabs, currentTab: { ...currentTab, responseHeaderMode: value }}; }
        else if (element === "responseBody") { newState = { tabs: updatedTabs, currentTab: { ...currentTab, responseBodyMode: value }}; }
    }
    newState.counter = this.state.counter;
    this.setState(newState);
    localStorage.setItem('profiles',JSON.stringify(newState));
  };

  handleSelectTab = tab => {
    const newState = {
      tabs: this.state.tabs,
      currentTab: tab,
      counter: this.state.counter,
    }
    this.setState(newState);
    localStorage.setItem('profiles',JSON.stringify(newState));
  };

  handleAddTab = () => {
    const { tabs } = this.state;
    console.log(tabs);

    if (tabs.length === 0) {
      this.setState({
        tabs: this.state.tabs,
        currentTab: this.state.currentTab,
        counter: 1,
      });
    }

    const newTabObject =
      { id: uuid(), 
        name: `Profile ${this.state.counter}`, 
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

    const newState = {
      tabs: [...tabs, newTabObject],
      currentTab: newTabObject,
      counter: this.state.counter + 1,
    };
    this.setState(newState);
    localStorage.setItem('profiles',JSON.stringify(newState));
  };

  handleDeleteTab = tabToDelete => {
    const { tabs } = this.state;
    const tabToDeleteIndex = tabs.findIndex(tab => tab.id === tabToDelete.id);

    const updatedTabs = tabs.filter((tab, index) => {
      return index !== tabToDeleteIndex;
    });

    const previousTab =
      tabs[tabToDeleteIndex - 1] || tabs[tabToDeleteIndex + 1] || {};

    const newState = {
      tabs: updatedTabs,
      currentTab: previousTab,
      counter: this.state.counter,
    };
    this.setState(newState);
    localStorage.setItem('profiles',JSON.stringify(newState));
  };

  // React Life Cycle, loading from localstorage on refresh.
  componentDidMount() {
      if (localStorage.getItem('profiles')) {
          this.profilesData = JSON.parse(localStorage.getItem('profiles'));
          this.setState(this.profilesData);
      } else {
          this.setState({
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
          })
      }
  }

  render() {

    if (this.state.tabs.length === 0) {
        return (
            <div className="no-profiles">
                Make a <button className="btn btn-primary" onClick={this.handleAddTab}>New</button> profile to begin testing your API!
            </div>
        );
    }
    const { currentTab } = this.state;
    return currentTab !== {} ? (
      <div className="container">
        <div className="well">
          {this.createTabs()}
          <Content currentTab={currentTab} 
            handleHttpChange={this.handleHttpChange} handleAddTab={this.handleAddTab} 
            handleDeleteTab={this.handleDeleteTab} handleEditorChange={this.handleEditorChange}
            handleSelectTab={this.handleSelectTab} handleUrlChange={this.handleUrlChange} 
          />
        </div>
      </div>
    ) : (
        <p>empty</p>
    );
  }
}

export default ProfileTabs;