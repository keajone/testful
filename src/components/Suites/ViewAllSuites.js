// Module imports
import React from "react";

// Component imports
import ToolNav from "../Tool/ToolNav";
import PageHeader from "../Previews/PageHeader";

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
        return (
            <div className="view-all-suites-container">
                <ToolNav />
                <PageHeader value="Test Suites"/>
            </div>
        );
    }
}

export default ViewAllSuites;