import uuid from "uuid";

/**
 * This class is used for representation of Suite objects. 
 * It contains methods that return Suite configurations 
 * from default or adding a new Suite.
 */
class Suite {

    static default_SuiteName = "";
    static default_Description = "";

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
    }

    static edit = (suiteObj) => {
        try {
            let array = JSON.parse(localStorage.getItem('Suites'));
            if (array.length > 0) {
                for (var i in array) {
                    if (array[i].id === suiteObj.id) {
                        array[i] = suiteObj;
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

    static getAll = () => {
        return JSON.parse(localStorage.getItem('Suites'));
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
        
        // // make request
        // var http = new HTTP(
        //     testSuite.givenRequestHeader,
        //     testSuite.givenRequestBody,
        //     testSuite.method, testSuite.url);
        // await http.request();

        // return;
    }

    // Returns an empty Suite configuration
    static getEmptySuite = () => {
        return {
            id: uuid(), 
            SuiteName: this.default_SuiteName,
            Description: this.default_Description,
            caseList: [],
            status: '',
        };
    };
    
}

export default Suite;