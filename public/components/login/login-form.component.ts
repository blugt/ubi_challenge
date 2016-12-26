import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.component.html'
})
export class LoginFormComponent implements OnInit{

    user: User = new User(null,'','');
    isLogged: boolean;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.authenticated.subscribe((value: boolean) => {
            this.isLogged = value;
        });
    }

    userLogin() {
        this.authService.login(this.user.email);
    }

    userLogout() {
        this.authService.logout();
    }
}