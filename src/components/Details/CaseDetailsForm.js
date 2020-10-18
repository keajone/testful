// Module imports
import React from "react";

// Component imports

// CSS imports

/**
 * Component for displaying details of a case run
 */
class CaseDetailsForm extends React.Component {

    constructor(props) {
        super(props);
        let id = props.id;
        let caseObj = props.case;

        this.state = {
            id: id,
            case: caseObj,
        };
    }

    render() {
        return ( 
            <div className="case-details-container">

            </div>
        );
    }
}

export default CaseDetailsForm;