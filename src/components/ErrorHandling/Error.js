// Module imports
import React from "react";

/**
 * This class is used for representation of Errors.
 */
class Error extends React.Component {

    static clear = () => {
        document.getElementById("error-box").style.display = "none";
    }

    static set = (value) => {
        document.getElementById("error-box").childNodes[1].innerHTML = '<span><strong>Error: </strong>'+ value +'</span>';
        document.getElementById("error-box").style.display = "block";
    }

    render() {
        return (
            <div className="alert alert-danger" id="error-box" role="alert">
                <span className="closebtn" onClick={() => Error.clear()}>&times;</span>
                <span></span>
            </div>
        );
    }
    
}

export default Error;