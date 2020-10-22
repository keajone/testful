// Module imports
import React from "react";
import ReactDOM from 'react-dom';
import Case from "../Cases/Case";

// Component imports
import Diff from "./DiffViewer";

// CSS imports
import "../css/Details/CaseDetails.css";

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

        this.status = undefined;
        this.errMessage = undefined;
        this.onFail = props.onFail;
    }

    componentDidMount = async () => {
        try {
            await Case.execute(this.state.case);
            this.status = "pass";
        }
        catch (err) {
            console.log(err);
            this.status = "fail";
            this.errMessage = err.message;
        }
        this.setStatus();
        this.setDiff();
    }

    setStatus = () => {
        var status;

        if (this.status === "pass") {
            status = (
                <div id={"pass_"+this.state.id}>
                    <label className="badge badge-success">PASSED</label>
                </div>
            )
        } else if (this.status === "fail") {
            status = (
                <div id={"fail_"+this.state.id}>
                    <label className="badge badge-danger">FAILED</label>
                    <label>&nbsp;&nbsp;&nbsp;{this.errMessage}</label>
                </div>
            );
            if (this.onFail !== undefined)
                this.onFail();
        } else
            status = (<></>)

        ReactDOM.render(status, document.getElementById("case-details-status"+this.state.case.id));
    }

    setDiff = () => {
        console.log(this.state.case.expectedResponseBody);
        console.log(this.state.case.responseBody);
        ReactDOM.render(
            <Diff 
                  expected={this.state.case.expectedResponseBody}
                  given={this.state.case.responseBody}
            />, 
            document.getElementById("case-details-diff"+this.state.case.id)
        );
    }

    render() {
        return ( 
            <div className="case-details-container">
                <h3>{this.state.case.caseName}</h3>

                <div id="case-details-status"><div id={"case-details-status"+this.state.case.id}></div></div>

                <div id="case-details-diff"><div id={"case-details-diff"+this.state.case.id}></div></div>
            </div>
        );
    }
}

export default CaseDetailsForm;