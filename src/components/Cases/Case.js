import uuid from "uuid";
import React from "react";

import HTTP from "../../http/http";
import ErrorHTTP from "../ErrorHandling/ErrorHTTP";
import ErrorAnyResponseBody from "../ErrorHandling/ErrorAnyResponseBody";
import ErrorExpectedResponseBody from "../ErrorHandling/ErrorExpectedResponseBody";
import ErrorAnyResponseHeader from "../ErrorHandling/ErrorAnyResponseHeader";
import ErrorExpectedResponseHeader from "../ErrorHandling/ErrorExpectedResponseHeader";

export const CaseCheckOptions = {
    ONE: 'returns-any-response-body',
    TWO: 'returns-expected-response-body',
    THREE: 'returns-any-response-header',
    FOUR: 'returns-expected-response-header',
    FIVE: 'returns-response-body-schema',
};

/**
 * This class is used for representation of Case objects. 
 * It contains methods that return case configurations 
 * from default or adding a new case.
 */
class Case {

    static default_caseName = "";
    static default_method = "GET";
    static default_url = "";
    
    static default_givenRequestHeader = 
    "content-type: application/json; charset=utf-8";

    static default_givenRequestBody = "";

    static default_expectedResponseHeader = "";
    static default_expectedResponseBody = "";

    static default_errors = [];

    static cases = [];

    constructor(jsonObject) {

        try {
            Case.verify(jsonObject);
        }
        catch (err) {
            throw new Error(err);
        }
        this.jsonObject = jsonObject;
        this.id = jsonObject.id;
        this.caseName = jsonObject.caseName;
        this.method = jsonObject.method;
        this.url = jsonObject.url;
        this.givenRequestBody = jsonObject.givenRequestBody;
        this.givenRequestHeader = jsonObject.givenRequestHeader;
        this.expectedResponseBody = jsonObject.expectedResponseBody;
        this.expectedResponseHeader = jsonObject.expectedResponseHeader;
    }

    static verify = (caseObj) => {
        if (caseObj.id === "") {
            throw new Error("Case ID is invalid.");
        }
        if (caseObj.caseName === "") {
            throw new Error("Must give valid Case Name.");
        }
        if (caseObj.method !== "GET" &&
            caseObj.method !== "POST" &&
            caseObj.method !== "PUT" &&
            caseObj.method !== "PATCH" &&
            caseObj.method !== "DELETE") {
            throw new Error("Case method is invalid.");
        }
        if (caseObj.url === "") {
            throw new Error("Must give valid URL.");
        }

        // if (this.givenRequestHeader === "") {
        //     throw new Error("Must give valid Request Header.");
        // }

        if (caseObj.givenRequestBody === "" && caseObj.method !== "GET") {
            throw new Error("Must give valid Request-Body when using HTTP method '"+caseObj.method+"'.");
        }

        // if (this.expectedResponseHeader === "") {
        //     throw new Error("Must give valid Expected Response Header.");
        // }

        // if (this.givenRequestBody === "") {
        //     throw new Error("Must give valid Expected Response Body.");
        // }
    }

    static getAll = () => {
        if (localStorage.getItem('cases') !== null)
            return JSON.parse(localStorage.getItem('cases'));
        else
            return [];
    }

    addToLocalStorage = () => {
        if (localStorage.getItem('cases')) {
            Case.cases = JSON.parse(localStorage.getItem('cases'));
            Case.cases.push(this.jsonObject);
            localStorage.setItem('cases',JSON.stringify(Case.cases));
        } else {
            localStorage.setItem('cases',JSON.stringify([this.jsonObject]));   
        }
    }

    static remove = (caseObj) => {
        try {
            let array = JSON.parse(localStorage.getItem('cases'));
            array = array.filter(function( obj ) {
                return obj.id !== caseObj.id;
            });
            localStorage.setItem('cases', JSON.stringify(array));

            let array2 = JSON.parse(localStorage.getItem('Suites'));
            for (let i=0; i < array2.length; i++) {
                array2[i].caseList = array2[i].caseList.filter(function (obj) {
                    return obj.id !== caseObj.id;
                })
            }
            localStorage.setItem('Suites', JSON.stringify(array2));
            return true;
        }
        catch (err) {
            return false;
        }
    }

    static edit = (caseObj) => {
        try {
            // verify the change
            this.verify(caseObj);

            // Update test case
            let array = JSON.parse(localStorage.getItem('cases'));
            if (array.length > 0) {
                for (var i in array) {
                    if (array[i].id === caseObj.id) {
                        array[i] = caseObj;
                        break;
                    }
                }
                localStorage.setItem('cases', JSON.stringify(array));
                
                // Update the case lists inside suites
                let array2 = JSON.parse(localStorage.getItem('Suites'));
                for (let j=0; j < array2.length; j++) {
                    for (var h in array2[j].caseList) {
                        if (array2[j].caseList[h].id === caseObj.id) {
                            array2[j].caseList[h] = caseObj;
                            break;
                        }
                    }
                }
                localStorage.setItem('Suites', JSON.stringify(array2));
            }
        }
        catch (err) {
            throw err;
        }
        return false;
        
    }

    static execute = async (testCase) => {

        var errors = [];
        
        try {
            // make request
            var http = new HTTP(
                testCase.givenRequestHeader,
                testCase.givenRequestBody,
                testCase.method, testCase.url);
            await http.request();
        }
        catch (err) {
            testCase.responseBody = http.responseBody;
            errors.push(<ErrorHTTP case={testCase} message={err.message}/>);
            return errors;
        }
        testCase.responseBody = http.responseBody;
        testCase.responseHeader = http.responseHeader;
        console.log(testCase);

        /**
         * Perform checks based on configuration of test case
         */

        // Any response body was returned
        if (testCase[CaseCheckOptions.ONE] === true) {
            if (testCase.responseBody.length === 0)
                // throw new Error("No response body returned.");
                errors.push(<ErrorAnyResponseBody case={testCase} message="No response body returned."/>);
        }
        // Expected response body
        if (testCase[CaseCheckOptions.TWO] === true) {
            if (testCase.responseBody !== testCase.expectedResponseBody)
                // throw new Error("Response body doesn't match the expected value.");
                errors.push(<ErrorExpectedResponseBody case={testCase} message="Response body doesn't match the expected value."/>);
        }
        // Any response header was returned
        if (testCase[CaseCheckOptions.THREE] === true) {
            if (testCase.responseHeader.length === 0)
                // throw new Error("No response header(s) returned.");
                errors.push(<ErrorAnyResponseHeader case={testCase} message="No response header(s) returned."/>);
        }
        // Expected response header
        if (testCase[CaseCheckOptions.FOUR] === true) {
            if (testCase.responseHeader !== testCase.expectedResponseHeader)
                // throw new Error();
                errors.push(<ErrorExpectedResponseHeader case={testCase} message="Response header(s) doesn't match the expected value."/>);
        }

        return errors;
    }

    // Returns an empty case configuration
    static getEmptyCase = () => {
        var emptyCase = {
            id: uuid(), 
            caseName: this.default_caseName,
            url: this.default_url,
            method: this.default_method,
            givenRequestBody: this.default_givenRequestBody,
            givenRequestHeader: this.default_givenRequestHeader,
            expectedResponseHeader: this.default_expectedResponseHeader,
            expectedResponseBody: this.default_expectedResponseBody,
            errors: this.default_errors,
            schemaBody: "{}",
        };
        emptyCase[CaseCheckOptions.ONE] = false;
        emptyCase[CaseCheckOptions.TWO] = false;
        emptyCase[CaseCheckOptions.THREE] = false;
        emptyCase[CaseCheckOptions.FOUR] = false;
        emptyCase[CaseCheckOptions.FIVE] = false;

        return emptyCase;
    };
    
}

export default Case;