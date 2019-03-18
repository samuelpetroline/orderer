import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfig } from '../app.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Injectable()
export class ApiService {
    private baseURL: string;

    constructor(private http: HttpClient) {


        this.baseURL = `${AppConfig.apiUrl}/api`;
    }

    post(url: string, data: any): Observable<any> {
        return this.http.post(this.baseURL + url, JSON.stringify(data), { headers: this.getHeaders() })
            .catch(err => {
                throw new Error(err.message);
            });
    }

    get(url: string, params?: HttpParams): Observable<any> {
        return this.http.get(this.baseURL + url, { headers: this.getHeaders(), params: params })
            .catch(err => {
                console.log(err);
                throw new Error(err.message);
            });
    }

    delete(url: string): Observable<any> {
        return this.http.delete(this.baseURL + url, { headers: this.getHeaders() })
            .catch(err => {
                throw new Error(err.message);
            });
    }

    put(url: string, data: any): Observable<any> {
        return this.http.put(this.baseURL + url, JSON.stringify(data), { headers: this.getHeaders() })
            .catch(err => {
                throw new Error(err.message);
            });
    }

    private getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');


        return headers;
    }
}