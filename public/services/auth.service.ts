import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    public authenticated = new BehaviorSubject(false);

    constructor(private http: Http) {}

    login(username: String, email: String) {
        this.http.post('/api/users',{email: email, username: username})
            .map(response => response.json())
            .subscribe((json) => {
                this.authenticated.next(true);
                localStorage.setItem('currentUserID', json.body.id);
            });
    }

    logout() {
        localStorage.removeItem('currentUserID');
        this.authenticated.next(false);
    }

    isAuthenticated(): boolean {
        return this.authenticated.value;
    }

    getCurrentUserID(): String {
        return localStorage.getItem('currentUserID');
    }
}