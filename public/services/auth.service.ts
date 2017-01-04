import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    private _authenticated: BehaviorSubject<boolean>;
    private _apiURL = '/api';

    constructor(private http: Http) {
        this._authenticated  = new BehaviorSubject(this.checkStorage());
    }

    login(username: String, email: String){

        this.http.post(`${this._apiURL}/users`, {email: email, username: username})
            .map(response => response.json())
            .subscribe((json) => {
                if(json.body) {
                    let user = { username: json.body.username, id: json.body.id };
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this._authenticated.next(this.checkStorage());
                }
            });
    }

    checkStorage():boolean {
        return localStorage.getItem('currentUser') !== null;
    }

    isAuthenticated$(): BehaviorSubject<boolean> {
        return this._authenticated;
    }

    getCurrentUsername(): string {
        return JSON.parse(localStorage.getItem('currentUser')).username;
    }

    getCurrentUserId(): string {
        return JSON.parse(localStorage.getItem('currentUser')).id;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this._authenticated.next(this.checkStorage());
    }

}