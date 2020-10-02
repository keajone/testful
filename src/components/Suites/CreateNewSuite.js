// Module imports
import React from "react";

// Component imports
import ToolNav from "../Tool/ToolNav";
import PageHeader from "../Previews/PageHeader";

/**
 * Component for managing the page that creates new test suites.
 */
class CreateNewSuite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    // static getDerivedStateFromProps(props) {
    //     return {tabs: props.tabs, currentTab: props.currentTab};
    // }

    render() {
        return (
            <div className="new-test-suite-container">
                <ToolNav />
                <PageHeader value="New Test Suite"/>
            </div>
        );
    }
}

export default CreateNewSuite;