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

        this.jsonObject = jsonObject;

        this.id = jsonObject.id;
        if (this.id === "") {
            throw new Error("Case ID is invalid.");
        }
        this.caseName = jsonObject.caseName;
        if (this.caseName === "") {
            throw new Error("Must give valid Case Name.");
        }
        this.method = jsonObject.method;
        if (this.method !== "GET" &&
            this.method !== "POST" &&
            this.method !== "PUT" &&
            this.method !== "PATCH" &&
            this.method !== "DELETE") {
            throw new Error("Case method is invalid.");
        }
        this.url = jsonObject.url;
        if (this.url === "") {
            throw new Error("Must give valid URL.");
        }
        this.givenRequestHeader = jsonObject.givenRequestHeader;
        // if (this.givenRequestHeader === "") {
        //     throw new Error("Must give valid Request Header.");
        // }
        this.givenRequestBody = jsonObject.givenRequestBody;
        if (this.givenRequestBody === "" && this.method !== "GET") {
            throw new Error("Must give valid Request-Body when using HTTP method '"+this.method+"'.");
        }
        this.expectedResponseHeader = jsonObject.expectedResponseHeader;
        // if (this.expectedResponseHeader === "") {
        //     throw new Error("Must give valid Expected Response Header.");
        // }
        this.expectedResponseBody = jsonObject.expectedResponseBody;
        // if (this.givenRequestBody === "") {
        //     throw new Error("Must give valid Expected Response Body.");
        // }
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

    removeFromLocalStorage = () => {

    }

    static edit = (caseObj) => {
        try {
            let array = JSON.parse(localStorage.getItem('cases'));
            if (array.length > 0) {
                for (var i in array) {
                    if (array[i].id === caseObj.id) {
                        array[i] = caseObj;
                    break;
                    }
                }
                localStorage.setItem('cases', JSON.stringify(array));
                return true;
            }
        }
        catch (err) {
            return false;
        }
        return false;
        
    }

    static execute = async (testCase) => {
        
        // make request
        var http = new HTTP(
            testCase.givenRequestHeader,
            testCase.givenRequestBody,
            testCase.method, testCase.url);
        await http.request();

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