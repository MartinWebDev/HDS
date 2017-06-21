// Imports (including config. Root is required in this file at the fetch stage)
import { ServiceConfig } from './Config/ServiceConfig';

// Interfaces for all Service calls
export interface IServiceCall {
    Method: "POST" | "GET" | "DELETE" | "PUT";
    Uri: string;
    Headers: any;
    Body: any;

    WithMethod(method: "POST" | "GET" | "DELETE" | "PUT"): IServiceCall;
    WithUri(uri: string): IServiceCall;
    WithHeaders(headers: any): IServiceCall;
    WithBody(body: any): IServiceCall;
    Fetch(): Promise<Response>;
}

export interface IServiceResponse {
    StatusCode: number;
    StatusText: string;
    Result: any;
    Error: any;
}

export class ServiceResponse implements IServiceResponse {
    StatusCode: number;
    StatusText: string;
    Result: any;
    Error: any;
}

/**
 * Main ServiceCall class. This class will be created and then used by each service 
 * to make sure that they all work the same way. 
 */
export class ServiceCall implements IServiceCall {
    Method: "POST" | "GET" | "DELETE" | "PUT";
    Uri: string;
    Headers: any;
    Body: any;

    constructor () {
        this.Method = "POST";

        this.Headers = {
            "Accept": "application/json", 
            "Content-Type": "application/json"
        };
    }

    WithMethod(method: "POST" | "GET" | "DELETE" | "PUT"): IServiceCall {
        this.Method = method;

        return this;
    }

    WithUri(uri: string): IServiceCall {
        // replace("//", "/") here ensures that if someone accidentally adds a / at the start 
        // of the api location the duplicate is removed. 
        // EG: http://website.com//myApi becomes http://website.com/myApi
        this.Uri = (ServiceConfig.ApiRoot + uri).replace("//", "/");

        return this;
    };

    WithHeaders(headers: any): IServiceCall {
        this.Headers = Object.assign(this.Headers, headers);

        return this;
    };

    WithBody(body: any): IServiceCall {
        this.Body = body;

        return this;
    };

    Fetch(): Promise<Response> {
        return fetch(this.Uri, {
            method: this.Method, 
            mode: "cors",
            headers: this.Headers, 
            body: (typeof this.Body !== "undefined") ? JSON.stringify(this.Body) : null
        });
    };
}