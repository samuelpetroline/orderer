import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
import { AppConfig } from '../../app.config';
import { UserService } from '../User/user.service';
 
@Injectable()
export class AuthenticationService {

    constructor(private http: Http, private config: AppConfig, private userService: UserService) {}
     
    login(username: string, password: string) {
        return this.http.post(this.config.apiUrl + '/api/users/authenticate/' + username + '/' + password, "")
            .map((response: Response) => {
                let user = response.json();
                if (user) {
                    this.userService.login(user);
                }
            });
    }
 
    logout() {
        this.userService.logout();
    }
}