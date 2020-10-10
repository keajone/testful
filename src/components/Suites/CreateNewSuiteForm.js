// Module imports
import React from "react";
import { Formik, Field } from "formik";
import { withRouter } from "react-router-dom";
import {BsSearch} from "react-icons/bs";
import {GrAdd} from "react-icons/gr";

// Component imports
import NumberedTextArea from "../Previews/NumberedTextArea";
import Suite from "../Suites/Suite";
import Error from "../ErrorHandling/Error";
import {ViewAllSuitesPath} from "../../App";
import Case from "../Cases/Case";
import {
    getSaveButton,
    MultiLineInput,
    SingleLineInput,
    SelectDropdown,
} from "../Tool/FormUtils"

// CSS imports
import "../css/Suites/NewSuiteForm.css";

/**
 * Component for displaying the form to add a new Suite.
 */
class NewSuiteForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    // Attempts to add a new suite to the User's LocalStorage.
    newSuite = (data) => {

        Error.clear();
        try {
            var object = new Suite(data);
            object.addToLocalStorage();
        }
        catch (err) {
            console.log(err);
            Error.set(err.message);
            return false
        }
        return true;
    }

    render() {
        return (

            <div className="new-suite-form">
                <div className="new-suite-window">
                    <Formik 
                        initialValues={Suite.getEmptySuite()} 
                        onSubmit={(data,actions) => { 
                            var isSuccess = this.newSuite(data); 
                            actions.setSubmitting(false);
                            
                            // If successfully added, view all suites.
                            if (isSuccess)
                                this.props.history.push(ViewAllSuitesPath);
                        }}
                    >
                        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>

                                {/** Suite Name input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <SingleLineInput 
                                        name="Suite Name"
                                        placeholder='Example: "Test Suite 1"' 
                                        onChange={setFieldValue} 
                                        valueToChange="SuiteName"
                                    />
                                )}
                                </Field>

                                {/** Description input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <MultiLineInput
                                        name="Description"
                                        placeholder='Example: "This suite focuses on testing the &apos;users&apos; endpoint."'
                                        onChange={setFieldValue} 
                                        valueToChange="Description"
                                    />
                                )}
                                </Field>

                                {getSaveButton(isSubmitting)}

                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <CaseList onChange={setFieldValue} valueToChange="caseList" caseList={values.caseList}/>
                                )}   
                                </Field>

                                

                                <pre>{JSON.stringify(values, null, 2)}</pre>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>

        );
    }
}

class CaseList extends React.Component {
    constructor(props) {
        super(props);
        this.updateAddedList = props.onChange;
        this.list = props.caseList;
        this.fieldValue = props.valueToChange;

        console.log(this.list);

        let tmpList = [];
        let allCases = Case.getAll();
        for (let i=0; i<allCases.length; i++) {
            if (!this.list.includes(allCases[i])) {
                tmpList.push(allCases[i]);
            }
        }

        this.state = {
            cases: Case.getAll(),
            NotAddedCases: tmpList,
            AddedCases: this.list,
            search: '',
        };
    }

    handleSearchChange = e => {
        this.setState({search: e.target.value});
    }

    renderRequestMethod = (method) => {
        if (method === "GET")
            return (<label className="badge badge-primary">GET</label>);
        else if (method === "POST")
            return (<label className="badge badge-success">POST</label>);
        else if (method === "PUT")
            return (<label className="badge badge-danger">PUT</label>);
        else if (method === "PATCH")
            return (<label className="badge badge-info">PATCH</label>);
        else if (method === "DELETE")
            return (<label className="badge badge-dark">DELETE</label>);
        else
            return (<label className="badge badge-warning">{method}</label>);
    }

    generateCaseList = () => {

        // Searching
        const {search} = this.state;
        const filteredCases = this.state.NotAddedCases.filter(testCase => {
            return (
                testCase.caseName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                testCase.url.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                testCase.method.toLowerCase().indexOf(search.toLowerCase()) !== -1
            )
        });

        if (filteredCases.length > 0) {
            const allCases = filteredCases.map(testCase => {
                return (
                    <div key={testCase.id} className="case-item-new-suite">
                        <ul>
                            <li className="case-item-new-suite-name"><label>{testCase.caseName}</label></li>
                            <li className="case-item-new-suite-url"><label>{testCase.url}</label></li>
                            <li className="case-item-new-suite-add">
                                <button type="button" onClick={() => {this.addToAddedList(testCase.id)}} className="btn btn-success"><label>Add</label></button>
                            </li>
                            <li className="case-item-new-suite-method">{this.renderRequestMethod(testCase.method)}</li>
                            
                        </ul>
                    </div>
                );
            });
            return allCases;
        } else {
            return <label>No Cases</label>;
        }
    }

    generateAddedCaseList = () => {

        const caseList = this.state.AddedCases;

        if (caseList.length > 0) {
            const allCases = caseList.map(testCase => {
                return (
                    <div key={testCase.id} className="case-item-new-suite">
                        <ul>
                            <li className="case-item-new-suite-name"><label>{testCase.caseName}</label></li>
                            <li className="case-item-new-suite-url"><label>{testCase.url}</label></li>
                            <li className="case-item-new-suite-add">
                                <button type="button" onClick={() => {this.removeFromAddedList(testCase.id)}} className="btn btn-danger"><label>Remove</label></button>
                            </li>
                            <li className="case-item-new-suite-method">{this.renderRequestMethod(testCase.method)}</li>
                            
                        </ul>
                    </div>
                );
            });
            return allCases;
        } else {
            return <label>No Cases</label>;
        }
    }

    addToAddedList = (id) => {
        let copyListNA = this.state.NotAddedCases;
        let copyListA = this.state.AddedCases;

        const element = copyListNA.find(c => c.id === id);
        if (element !== undefined) {
            copyListNA.splice(copyListNA.indexOf(element),1);
            copyListA.unshift(element)
            this.setState({
                NotAddedCases: copyListNA,
                AddedCases: copyListA,
            });
            this.updateAddedList(this.fieldValue, copyListA);
            // this.sleep(300);
        } else {
            console.log("Failed to add to list");   
        }
    }

    sleep = (milliseconds) => {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    removeFromAddedList = (id) => {
        let copyListNA = this.state.NotAddedCases;
        let copyListA = this.state.AddedCases;

        const element = copyListA.find(c => c.id === id);
        if (element !== undefined) {
            copyListA.splice(copyListA.indexOf(element),1);
            copyListNA.unshift(element)
            this.setState({
                NotAddedCases: copyListNA,
                AddedCases: copyListA,
            });
            this.updateAddedList(this.fieldValue, copyListA);
            // this.sleep(300);
        } else {
            console.log("Failed to remove to list");   
        }
    }

    render() {
        return (
            <div className="new-suite-case-list">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className="form-group case-search-new-suite">
                                    <label>Add Cases to Suite</label>
                                    <span className="form-control-feedback"><BsSearch/></span>
                                    <input className="form-control" type="text" 
                                        placeholder="Search" aria-label="Search"
                                        onChange={this.handleSearchChange}/>
                                </div>
                                <div className="to-add-list">
                                    <ul>
                                    {this.generateCaseList()}
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <div className="added-list">
                                    {this.generateAddedCaseList()}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                
            </div>
        );
    }
}

export default withRouter(NewSuiteForm);