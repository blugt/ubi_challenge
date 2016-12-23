import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {}

    login(uname: String, pword: String) {
        
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}