// Module imports
import React from "react";

// Component imports
import CaseLoadingAnimation from "../Animations/CaseLoadingAnimation";
import Case from "../Cases/Case";
import Suite from "../Suites/Suite";

// CSS imports


/**
 * Component for displaying details of either a case run or suite run
 */
class SuiteDetailsForm extends React.Component {

    constructor(props) {
        super(props);
        let id = props.id;
        let suite = props.suite;

        this.state = {
            id: id,
            suite: suite,
        };
    }
    componentDidMount() {
        this.runSuite();
    }

    runCase = async (testCase) => {

        document.getElementById("pass_"+this.state.id + "_" + testCase.id).style.display = 'none';
        document.getElementById("fail_"+this.state.id + "_" + testCase.id).style.display = 'none';
    
        try {
            // document.getElementById("run_"+this.state.id + "_" + testCase.id).style.display = 'none';
            // CaseLoadingAnimation.toggle(this.state.id + "_" + testCase.id);
            await Case.execute(testCase);
            document.getElementById("pass_"+this.state.id + "_" + testCase.id).style.display = 'block';
        }
        catch (err) {
            document.getElementById("fail_"+this.state.id + "_" + testCase.id).style.display = 'block';
            throw err;
        }
        // document.getElementById("run_"+this.state.id + "_" + testCase.id).style.display = 'block';
        // CaseLoadingAnimation.toggle(this.state.id + "_" + testCase.id);
        
      }
    
      runSuite = async () => {

        var failed = false;
    
        document.getElementById("pass_"+this.state.id).style.display = 'none';
        document.getElementById("fail_"+this.state.id).style.display = 'none';
        
        // document.getElementById("run_"+this.state.id).style.display = 'none';
        // CaseLoadingAnimation.toggle(this.state.id);

        for (let i=0; i < this.state.suite.caseList.length; i++) {
            try {
                await this.runCase(this.state.suite.caseList[i]);
            }
            catch (err) {
                console.log(err);
                document.getElementById("error_"+this.state.suite.caseList[i].id).innerHTML = err;
                failed = true;
            }
        }

        if (failed) {
            document.getElementById("pass_"+this.state.id).style.display = 'none';
            document.getElementById("fail_"+this.state.id).style.display = 'block';
            this.state.suite.status = "fail";
        } else {
            document.getElementById("pass_"+this.state.id).style.display = 'block';
            this.state.suite.status = "pass";
        }
        Suite.edit(this.state.suite);
        // document.getElementById("run_"+this.state.id).style.display = 'block';
        // CaseLoadingAnimation.toggle(this.state.id);
    }

    getCases = () => {
        return (
            <div>{this.state.suite.caseList.map((c) => { 

                return (
                    <div key={c.id} className="details-case-box">
                        {c.caseName} <br/> 
                        <div className="details-pass-small" id={"pass_"+this.state.id+"_"+c.id}>
                            <label className="badge badge-success">PASSED</label>
                        </div>
                        <div className="details-fail-small" id={"fail_"+this.state.id+"_"+c.id}>
                            <label className="badge badge-danger">FAILED</label>
                        </div>
                        <pre id={"error_"+c.id}>

                        </pre>
                    </div>
                ); 
            })}</div>
        )
    }

    getName = () => {
        return (
            <div className="details-suite-name">
                <label>{this.state.suite.SuiteName}</label>
            </div>
        );
    }

    getStatus = () => {
        return (
            <div className="details-status">
                <label className="badge badge-success" id={"pass_"+this.state.id}>PASSED</label>
                <label className="badge badge-danger" id={"fail_"+this.state.id}>FAILED</label>
            </div>
        );
    }

    render() {
        return ( 
            <div className="suite-details-container">

                <h2>Suite:</h2>
                {this.getName()}

                <br/>

                <h2>Status:</h2>
                {this.getStatus()}

                <br/>

                <h2>Cases:</h2><br/>
                {this.getCases()}

            </div>
        );
    }
}

export default SuiteDetailsForm;