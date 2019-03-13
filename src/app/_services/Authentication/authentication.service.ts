import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private apiService: ApiService, private userService: UserService) { }

    login(email: string, password: string) {
        let encoded = btoa(JSON.stringify({ email: email, password: password }));

        try
        {
            return new Promise<any>((resolve, reject) => {
                this.apiService.post<any>('/auth', encoded).map(data => {
                    if (data) {
                        this.saveToken(data.token);
                        this.userService.setUser(data.user);
                        this.isAuthenticatedSubject.next(true);
                    }

                    return { sucess: true, message: "Login realizado com sucesso"};
                }).subscribe(user => {
                    resolve(user);
                }, error => {
                    reject(error);
                });
            });

        }
        catch (ex)
        {
            throw ex;
        }
    }

    logout() {
        this.destroyToken();
        this.userService.setUser(null);
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