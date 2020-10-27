// Module imports
import React from "react";
import Collapsible from 'react-collapsible';

// Component imports
// import Case from "./Case";
// import Error from "../ErrorHandling/Error";
import Diff from "../Details/DiffViewer";

// CSS imports

/**
 * Component for displaying HTTP errors
 */
class ErrorExpectedResponseBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            case: props.case,
            message: props.message,
        };
    }

    render() {
        return (
            <div>
                <Collapsible trigger={
                    <button type="button" className="btn btn-secondary dropdown-toggle">
                        {this.state.message}
                    </button>}>
                <Diff 
                    expected={this.state.case.expectedResponseBody} leftTitle="Expected Response Body"
                    given={this.state.case.responseBody} rightTitle="Given Response Body"
                />
                </Collapsible>
                <br/>
            </div>

        )
    }
}

export default ErrorExpectedResponseBody;