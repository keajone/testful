class HTTP {

    constructor(header, body, method, url) {
        this.requestHeader = header;
        this.requestBody = body;
        this.method = method;
        this.url = url;
        this.responseBody = "";
        this.responseHeader = "";
    }

    request = async () => {
        try {
            const response = await fetch(this.url, {
                method: this.method,
                headers: this.headers,
                body: JSON.stringify(this.body),
            });

            // Collect response header information
            var tmp = "";
            response.headers.forEach(
                function(val, key) { 
                    tmp = tmp.concat(key +': '+ val +'\n');
                }
            );

            this.responseHeader = tmp;
            const json = await response.json();
            this.responseBody = JSON.stringify(json);
        }
        catch (err) {
            throw new Error("Failed to send "+ this.method +" request to '"+ this.url +"'.");
        }
    }

}

export default HTTP;