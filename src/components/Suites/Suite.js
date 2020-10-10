import uuid from "uuid";

import HTTP from "../../http/http";

/**
 * This class is used for representation of Suite objects. 
 * It contains methods that return Suite configurations 
 * from default or adding a new Suite.
 */
class Suite {

    static default_SuiteName = "";
    static default_method = "GET";
    static default_url = "";
    
    static default_givenRequestHeader = "";
    static default_givenRequestBody = "";

    static default_expectedResponseHeader = "";
    static default_expectedResponseBody = "";

    static Suites = [];

    constructor(jsonObject) {

        this.jsonObject = jsonObject;

        this.id = jsonObject.id;
        if (this.id === "") {
            throw new Error("Suite ID is invalid.");
        }
        this.SuiteName = jsonObject.SuiteName;
        if (this.SuiteName === "") {
            throw new Error("Must give valid Suite Name.");
        }
        this.method = jsonObject.method;
        if (this.method !== "GET" &&
            this.method !== "POST" &&
            this.method !== "PUT" &&
            this.method !== "PATCH" &&
            this.method !== "DELETE") {
            throw new Error("Suite method is invalid.");
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
        if (localStorage.getItem('Suites')) {
            Suite.Suites = JSON.parse(localStorage.getItem('Suites'));
            Suite.Suites.push(this.jsonObject);
            localStorage.setItem('Suites',JSON.stringify(Suite.Suites));
        } else {
            localStorage.setItem('Suites',JSON.stringify([this.jsonObject]));   
        }
    }

    removeFromLocalStorage = () => {

    }

    static edit = (SuiteObj) => {
        try {
            let array = JSON.parse(localStorage.getItem('Suites'));
            if (array.length > 0) {
                for (var i in array) {
                    if (array[i].id === SuiteObj.id) {
                        array[i] = SuiteObj;
                    break;
                    }
                }
                localStorage.setItem('Suites', JSON.stringify(array));
                return true;
            }
        }
        catch (err) {
            return false;
        }
        return false;
        
    }

    static execute = async (testSuite) => {
        
        // make request
        var http = new HTTP(
            testSuite.givenRequestHeader,
            testSuite.givenRequestBody,
            testSuite.method, testSuite.url);
        await http.request();

        return;
    }

    // Returns an empty Suite configuration
    static getEmptySuite = () => {
        return {
            id: uuid(), 
            SuiteName: this.default_SuiteName,
            Description: "",
            caseList: [],
        };
    };
    
}

export default Suite;