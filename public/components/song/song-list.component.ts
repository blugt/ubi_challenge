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

        this.songsService.getSongs()
            .subscribe( songs => {
                for(let song of songs ) {
                    this.songList.push(song);
                }
                if(this.authService.isAuthenticated$().value) {
                    this.getFavorites();
                }
        });

        this._authSubscription = this.authService.isAuthenticated$()
            .subscribe((value: boolean) => {
                if(value) {
                    this.getFavorites();
                } else {
                    for(let song of this.songList) {
                        song.isFavorite = false;
                    }
                }
            });

    }

    ngOnDestroy() {
        this._authSubscription.unsubscribe();
    }

    getFavorites() {

        this.songsService.getFavorites(this.authService.getCurrentUserId())
            .subscribe( favorites => {
                if(favorites.length != 0){
                    for(let fav of favorites) {
                        for( let song of this.songList){
                            if(fav.id === song.id) {
                                song.isFavorite = true;
                            }
                        }
                    }
                }
            });

    }

}