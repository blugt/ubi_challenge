import { Component, Input, OnInit } from "@angular/core";
import { Song } from './../../models/song';
import { SongService } from './../../services/song.service';
import { DataService } from './../../services/data.service';
import { AuthService } from './../../services/auth.service';

@Component({
    selector: 'song-item',
    providers: [SongService],
    templateUrl: 'song.component.html'
})
export class SongComponent {
    
    @Input('song') song: Song;
    private userLogged = false;

    constructor(private songService: SongService, private authService: AuthService, private dataService: DataService) {}

    ngOnInit() {
        this.authService.authenticated.subscribe((value: boolean) => {
            this.userLogged = value;
        });
    }

    storeSongDetails() {
         this.dataService.storeNew(this.song);
    }

    addFavorite() {
        this.songService.addFavorite(parseInt(localStorage.getItem('currentUserID')), this.song.id);
    }

    removeFavorite() {
        this.songService.removeFavorite(parseInt(localStorage.getItem('currentUserID')), this.song.id);
    }

}