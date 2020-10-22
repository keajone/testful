import uuid from "uuid";

import HTTP from "../../http/http";

/**
 * This class is used for representation of Case objects. 
 * It contains methods that return case configurations 
 * from default or adding a new case.
 */
class Case {

    static default_caseName = "";
    static default_method = "GET";
    static default_url = "";
    
    static default_givenRequestHeader = "";
    static default_givenRequestBody = "";

    static default_expectedResponseHeader = "";
    static default_expectedResponseBody = "";

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
            throw err;
        }

        // check expected vs given response body
        testCase.responseBody = http.responseBody;
        if (testCase.responseBody !== testCase.expectedResponseBody)
            throw new Error("Response body doesn't match the expected value.");

        return;
    }

    // Returns an empty case configuration
    static getEmptyCase = () => {
        return {
            id: uuid(), 
            caseName: this.default_caseName,
            url: this.default_url,
            method: this.default_method,
            givenRequestBody: this.default_givenRequestBody,
            givenRequestHeader: this.default_givenRequestHeader,
            expectedResponseHeader: this.default_expectedResponseHeader,
            expectedResponseBody: this.default_expectedResponseBody
        };
    };
    
}

export default Case;