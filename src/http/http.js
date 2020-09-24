class HTTP {

    constructor(header, body, method, url) {
        this.requestHeader = header;
        this.requestBody = body;
        this.method = method;
        this.url = url;
    }

    request = async () => {
        console.log("before fetch");
        const response = await fetch(this.url, {
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(this.body),
        });
        const json = await response.json();
        console.log("after fetch");

        console.log(json);
    }

}

export default HTTP;