import { Component, OnInit, OnDestroy } from '@angular/core';
import { SongComponent } from './song.component';
import { SongsService } from './../../services/songs.service';
import { AuthService } from './../../services/auth.service';
import { Song } from '../../models/song';


@Component({
    selector: 'song-list',
    templateUrl: '/song-list.component.html'
})
export class SongListComponent implements OnInit {
    
    songList: Song[] = [];
    private _authSubscription;

    constructor(private songsService: SongsService, private authService: AuthService) {}

    ngOnInit() {

        this._authSubscription = this.authService.isAuthenticated$()
            .subscribe( (value: boolean) => {
                if(value){
                    this.songsService.getSongsWithFavorites(this.authService.getCurrentUserId());
                }else{
                    this.songsService.getSongs();
                }
            } );

        
        this.songsService.songs$
            .subscribe( (songs: any) => {
                this.songList = songs;
            } );

    }

    ngOnDestroy() {
        this._authSubscription.unsubscribe();
    }

}