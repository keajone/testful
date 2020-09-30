// Module imports
import React from "react";

// Component imports
import ToolNav from "../Tool/ToolNav";

/**
 * Component for managing the page that views all test suites.
 */
class ViewAllSuites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tabs: props.tabs, currentTab: props.currentTab};
        this.handleNameChange = props.handleNameChange;
    }

    // static getDerivedStateFromProps(props) {
    //     return {tabs: props.tabs, currentTab: props.currentTab};
    // }

    render() {
        return (<div></div>);
    }
}

export default ViewAllSuites;