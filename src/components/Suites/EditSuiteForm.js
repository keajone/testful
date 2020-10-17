// Module imports
import React from "react";
import { Formik, Field } from "formik";
import { withRouter } from "react-router-dom";

// Component imports
import Suite from "../Suites/Suite";
import Error from "../ErrorHandling/Error";
import CaseList from "./CaseList";
import {
    getSaveButton,
    MultiLineInput,
    SingleLineInput,
} from "../Tool/FormUtils"


/**
 * Component for displaying the form to add a new Suite.
 */
class EditSuiteForm extends React.Component {

    constructor(props) {
        super(props);
        let obj = props.suite;
        this.state = {
            suiteObject: obj,
            id: obj.id,
            SuiteName: obj.SuiteName,
            Description: obj.Description,
            caseList: obj.caseList,
        };
    }

    // Attempts to edit the suite
    editSuite = (data) => {

        Error.clear();
        try {
            Suite.edit(data); 
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
                        initialValues={this.state.suiteObject} 
                        onSubmit={(data,actions) => { 
                            var isSuccess = this.editSuite(data);
                            actions.setSubmitting(false);
                            
                            // If successfully added, view all suites.
                            if (isSuccess)
                                console.log("success");
                                // this.props.history.push(ViewAllSuitesPath);
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
                                        value={values.SuiteName}
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
                                        value={values.Description}
                                    />
                                )}
                                </Field>

                                {getSaveButton(isSubmitting)}

                                {/** Add cases to suite input */}
                                <Field>
                                {({ form: { setFieldValue } }) => (
                                    <CaseList 
                                        onChange={setFieldValue} 
                                        valueToChange="caseList" 
                                        caseList={values.caseList}
                                    />
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

export default withRouter(EditSuiteForm);