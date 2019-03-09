import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { AppConfig } from '../app.config';



@Injectable()
export class ApiService {
    private headers: Headers;
    private options: RequestOptions;
    private baseURL: string;
    private http: Http;

    constructor() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        this.options = new RequestOptions({ headers: this.headers });
        this.baseURL = `${AppConfig.apiUrl}/api`;
    }

    post(url: string, data: any): Observable<any> {
        return this.http.post(this.baseURL + url, JSON.stringify(data), this.options);
    }

    get(url: string): Observable<Response> {
        return this.http.get(this.baseURL + url, this.options);
    }

    delete(url: string): Observable<Response> {
        return this.http.delete(this.baseURL + url, this.options);
    }

    put(url: string, data: any): Observable<Response> {
        return this.http.put(this.baseURL + url, JSON.stringify(data), this.options);
    }
}