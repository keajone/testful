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

            if (!response.ok) {
                // const err = await response.text();
                throw new Error(response.status + " (" + response.statusText + ")");
            }

            // Collect response header information
            var tmp = "";
            response.headers.forEach(
                function(val, key) { 
                    tmp = tmp.concat(key +': '+ val +'\n');
                }
            );
            this.responseHeader = tmp;

            // Collect response body information
            const contentType = response.headers.get("content-type");
            console.log(contentType);
            if (contentType && 
                (contentType.indexOf("application/json") !== -1 || contentType.indexOf("application/hal+json") !== -1)) {
                
                // process JSON
                const json = await response.json();
                this.responseBody = JSON.stringify(json);

            } else {

                // process Text/HTML/XML
                const text = await response.text();
                this.responseBody = text;
            }  
        }
        catch (err) {
            console.log(err);
            throw new Error("Failed to send "+ this.method +" request to '"+ this.url +"'.");
        }
    }

}

export default HTTP;