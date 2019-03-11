import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { ApiService } from '../api.service';
import { User } from 'app/_models/user';
import { UserService } from '../User/user.service';


@Injectable()
export class AuthenticationService {

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private apiService: ApiService, private userService: UserService) { }

    login(username: string, password: string) {
        let encoded = btoa(JSON.stringify({ username: username, password: password }));

        return this.apiService.post('/auth', encoded).map(data => {
            if (data) {
                this.saveToken(data.token);
                this.userService.setUser(data.user);
                this.isAuthenticatedSubject.next(true);
            }

            return { sucess: true, message: "Login realizado com sucesso"};
        }).catch(error => {
            return Observable.throw(error.json());
        });

        // this.apiService.post('/auth', encoded).subscribe(data => {
        //     this.saveToken(data.token);
        //     this.userService.setUser(data.user);
        //     this.isAuthenticatedSubject.next(true);
        // }, error => {
        //     throw new Error(error);
        // });

        // return { success: this.isAuthenticated, message:
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