import { Component, Input, OnInit } from "@angular/core";
import { Song } from './../../models/song';
import { AuthService } from './../../services/auth.service';
import { SongsService } from './../../services/songs.service';

@Component({
    selector: 'song-item',
    templateUrl: 'song.component.html'
})
export class SongComponent {
    
    @Input('song') song: Song;
    private userLogged = false;

    constructor(private authService: AuthService, private songsService: SongsService) {}

    ngOnInit() {
        this.authService.isAuthenticated$()
            .subscribe((value: boolean) => {
                this.userLogged = value;
            });
    }

    storeSongDetails() {
         //this.dataService.storeNewSong(this.song);
    }

    addFavorite() {
        let uid = this.authService.getCurrentUserId();
        this.songsService.addFavorite(uid, this.song.id)
            .subscribe((response: boolean) => {
                this.song.isFavorite = response;
            }
            , error => {
                console.log(error);
            });
        
    }

    removeFavorite() {
        let uid = this.authService.getCurrentUserId();
        this.songsService.removeFavorite(uid, this.song.id);
            
    }

    setFavorite(event) {
        event.stopPropagation();
        if(this.song.isFavorite) {
            this.removeFavorite();
        } else {
            this.addFavorite();
        }
    }

}