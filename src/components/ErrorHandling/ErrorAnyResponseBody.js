// Module imports
import React from "react";
import Collapsible from 'react-collapsible';

// Component imports
// import Case from "../Case";
// import Error from "../ErrorHandling/Error";

// CSS imports

/**
 * Component for displaying HTTP errors
 */
class ErrorAnyResponseBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Collapsible trigger={
                    <button type="button" className="btn btn-secondary dropdown-toggle">
                        {this.state.message}
                    </button>}
                >
                No response body was received.
                </Collapsible>
                <br/>
            </div>

        )
    }
}

export default ErrorAnyResponseBody;