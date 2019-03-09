import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import 'rxjs/add/operator/map'

import { ApiService } from '../api.service';


@Injectable()
export class AuthenticationService {

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private apiService: ApiService) { }

    login(username: string, password: string) {
        let encoded = btoa(JSON.stringify({ username: username, password: password }));

        return this.apiService.post('/api/users/authenticate', encoded);
    }

    logout() {
        this.destroyToken();
        this.isAuthenticatedSubject.next(false);
    }

    getToken(): String {
        return window.localStorage['jwtToken'];
    }

    saveToken(token: String) {
        window.localStorage['jwtToken'] = token;
    }

    destroyToken() {
        window.localStorage.removeItem('jwtToken');
    }
}