import { Component, OnInit } from '@angular/core';
import { SongComponent } from './song.component';
import { SongService } from './../../services/song.service';
import { AuthService } from './../../services/auth.service';
import { Song } from '../../models/song';


@Component({
    selector: 'song-list',
    providers: [SongService],
    templateUrl: '/song-list.component.html'
})
export class SongListComponent implements OnInit {
    
    songList: Song[] = [];

    constructor(private songService: SongService, private authService: AuthService) {}

    ngOnInit() {
        this.songService.getSongs()
            .subscribe( songs => {
                for(let song of songs ) {
                    this.songList.push(song);
                }

                 if(this.authService.isAuthenticated()) {
                    this.songService.getFavorites(this.authService.getCurrentUserID())
                        .subscribe( favorites => {
                            if(favorites){
                                for(let fav of favorites){
                                    for( let song of this.songList){
                                        if(song.id === fav.id) {
                                            song.isFavorite = true;
                                        }
                                    }
                                }
                            }
                        });
                }
            });
    }

}