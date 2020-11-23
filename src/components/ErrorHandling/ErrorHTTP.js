// Module imports
import React from "react";

/**
 * Component for displaying an error message when a test case fails due to an HTTP problem.
 */
class ErrorHTTP extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.message = props.message;
    }

    render() {
        return (
            <div>
                HTTP error
            </div>
        )
    }
}

export default ErrorHTTP;