// Module imports
import React from "react";
import { Formik, Field } from "formik";

// Component imports
import NumberedTextArea from "../Previews/NumberedTextArea";
import Case from "./Case";
import Error from "../ErrorHandling/Error";
import {ViewAllCasesPath} from "../../App";

// CSS imports
import "../css/Cases/NewCaseForm.css";

/**
 * Component for displaying the form to add a new case.
 * 
 * https://www.youtube.com/watch?v=FD50LPJ6bjE&ab_channel=BenAwad
 */
class NewCaseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    newCase = (data) => {

        Error.clear();
        try {
            var object = new Case(data);
            object.addToLocalStorage();
        }
        catch (err) {
            console.log(err);
            Error.set(err.message);
            return false
        }
        return true;
    }

    getSaveButton = (isSubmitting) => {
        let SaveButton;
        if (isSubmitting) {
            SaveButton = 
                <div className="new-case-submit">
                    <button type="Submit" disabled className="btn btn-primary">Save</button>
                </div>
        } else {
            SaveButton = 
                <div className="new-case-submit">
                    <button type="Submit" className="btn btn-primary">Save</button>
                </div>
        }
        return SaveButton;
    }

    // static getDerivedStateFromProps(props) {
    //     return {tabs: props.tabs, currentTab: props.currentTab};
    // }

    render() {
        return (

            <div className="new-case-form">
                <div className="new-case-window">
                    <Formik 
                        initialValues={Case.getEmptyCase()} 
                        onSubmit={(data,actions) => { 
                            var bool = this.newCase(data); 
                            actions.setSubmitting(false);
                            if (bool)
                                window.location.href = ViewAllCasesPath;
                        }}
                    >
                        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>

                                {this.getSaveButton(isSubmitting)}

                                {/** Case Name input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <div className="form-group">
                                        <label htmlFor="CaseNameInput">Case Name</label>
                                        <input type="input" className="form-control" 
                                               aria-describedby="CaseName" placeholder='Example: "Test Case 1"' 
                                               onChange={e => setFieldValue("caseName", e.target.value)}
                                        />
                                    </div>
                                )}
                                </Field>

                                {/** URL input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <div className="form-group">
                                        <label htmlFor="URL-Input">URL</label>
                                        <input type="input" className="form-control" 
                                               aria-describedby="URL" placeholder='Example: "https://api.github.com"' 
                                               onChange={e => setFieldValue("url", e.target.value)}
                                        />
                                    </div>
                                )}
                                </Field>

                                {/** HTTP Method input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <div className="form-group new-case-method-select">
                                        <label htmlFor="HTTP-method">HTTP Method</label>
                                        <select onChange={e => setFieldValue("method", e.target.value)} 
                                                className="form-control">
                                            <option>GET</option>
                                            <option>POST</option>
                                            <option>PUT</option>
                                            <option>PATCH</option>
                                            <option>DELETE</option>
                                        </select>
                                    </div>
                                )}
                                </Field>

                                <table className="new-case-form-table"><tbody>
                                <tr>
                                <td>
                                    {/** Request header input */}
                                    <NumberedTextArea title="Request Header" name="givenRequestHeader"/>
                                </td>
                                <td>
                                    {/** Request body input */}
                                    <NumberedTextArea title="Request Body" name="givenRequestBody"/>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    {/** Response header input */}
                                    <NumberedTextArea title="Expected Response Header" name="expectedResponseHeader"/>
                                </td>

                                <td>
                                    {/** Response body input */}
                                    <NumberedTextArea title="Expected Response Body"name="expectedResponseBody"/>
                                </td>
                                </tr>
                                </tbody></table>

                                <pre>{JSON.stringify(values, null, 2)}</pre>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>

        );
    }
}

export default NewCaseForm;