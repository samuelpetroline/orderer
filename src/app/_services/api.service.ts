import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication/authentication.service';
import { AppConfig } from '../app.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Injectable()
export class ApiService {
    private headers: HttpHeaders;
    private baseURL: string;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');

        this.baseURL = `${AppConfig.apiUrl}/api`;
    }

    post<T>(url: string, data: any): Observable<T> {
        return this.http.post<T>(this.baseURL + url, JSON.stringify(data), { headers: this.getHeaders() })
            .retry(3)
            .catch(err => {
                return Observable.of(err);
            });
    }

    get<T>(url: string): Observable<T> {
        return this.http.get<T>(this.baseURL + url, { headers: this.getHeaders() })
            .retry(3)
            .catch(err => {
                return Observable.of(err);
            });
    }

    delete(url: string): Observable<Response> {
        return this.http.delete(this.baseURL + url, { headers: this.getHeaders() })
            .retry(3)
            .catch(err => {
                return Observable.of(err);
            });
    }

    put<T>(url: string, data: any): Observable<T> {
        return this.http.put(this.baseURL + url, JSON.stringify(data), { headers: this.getHeaders() })
            .retry(3)
            .catch(err => {
                return Observable.of(err);
            });
    }

    private getHeaders(): HttpHeaders {
        // if (!this.headers.has('Authorization')) {

        //     let token = this.authService.getToken();
        //     if (token) {
        //         this.headers.append('Authorization', `Bearer ${token}`);
        //     }
        // }

        return this.headers;
    }
}