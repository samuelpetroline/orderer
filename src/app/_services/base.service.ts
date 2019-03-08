import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';

export class BaseService {
    private headers: Headers;
    private options: RequestOptions;
    private baseURL: string;
    private http: Http;
    private config: AppConfig;

    constructor() {
        this.config = new AppConfig();
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        this.options = new RequestOptions({ headers: this.headers });
        this.baseURL = `${this.config.apiUrl}/api`;
    }

    post(url: string, data: any): Observable<any> {
        return this.http.post(this.baseURL + url, JSON.stringify(data), this.options)
            .map(response => {
                response: response;
                data: response.json()
            });
    }

    get(url: string): Observable<Response> {
        return this.http.get(this.baseURL + url, this.options);
    }

    delete(url: string): Observable<Response> {
        return this.http.delete(this.baseURL + url, this.options);
    }
}