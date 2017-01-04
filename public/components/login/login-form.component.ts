import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { SongsService } from '../../services/songs.service';

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.component.html'
})
export class LoginFormComponent implements OnInit{

    user: User = new User('','','');
    isLogged: boolean = false;

    constructor(private authService: AuthService, private songsService: SongsService) {}

    ngOnInit() {
        this.authService.isAuthenticated$()
            .subscribe( (value: boolean) => {
                this.isLogged = value;
            } );
    }

    userLogin() {
        if( this.user.username && this.user.email ){
            this.authService.login(this.user.username, this.user.email);
        }
    }

    userLogout() {
        this.authService.logout();
    }
}