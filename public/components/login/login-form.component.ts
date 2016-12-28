import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.component.html'
})
export class LoginFormComponent implements OnInit{

    user: User = new User('','','');
    isLogged: boolean;

    constructor(private authService: AuthService, private dataService: DataService) {}

    ngOnInit() {
        this.authService.authenticated.subscribe((value: boolean) => {
            this.isLogged = value;
        });
    }

    userLogin() {
        if(this.user.username && this.user.email){
            this.authService.login(this.user.username, this.user.email)
                .subscribe(response => {
                    if(response.body.favorites) {
                        for(let fav of response.body.favorites){
                            this.dataService.storeFavorite(fav);
                        }
                    }
                });
        }
    }

    userLogout() {
        this.authService.logout();
    }
}