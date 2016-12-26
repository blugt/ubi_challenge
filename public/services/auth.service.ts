import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    public authenticated = new BehaviorSubject(false);

    constructor(private http: Http) {}

    login(email: String) {
        this.http.post('/api/users',{email: email, username: email})
            .map(response => response.json())
            .subscribe((json) => {
                this.authenticated.next(true);
            });
        
    }

    logout() {
        this.authenticated.next(false);
    }
}