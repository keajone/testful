// Module imports
import React from "react";

// Component imports
// import Case from "./Case";
// import Error from "../ErrorHandling/Error";

// CSS imports

/**
 * Component for displaying HTTP errors
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