import { Component, OnInit } from '@angular/core';
import { SongComponent } from './song.component';
import { SongService } from './../../services/song.service';
import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';
import { Song } from '../../models/song';


@Component({
    selector: 'song-list',
    providers: [SongService],
    templateUrl: '/song-list.component.html'
})
export class SongListComponent implements OnInit {
    
    songList: Song[] = [];

    constructor(private songService: SongService, private authService: AuthService, private dataService: DataService) {}

    ngOnInit() {

        this.authService.authenticated.subscribe((value: boolean) => {
            if(!value) {
                this.dataService.clearFavorites();
            } else {
                this.favoritesFill();
            }
        });

        this.songService.getSongs()
            .subscribe( songs => {
                for(let song of songs ) {
                    this.songList.push(song);
                }
        });

    }

    favoritesFill() {

        if(this.dataService.getFavorites().length == 0){
            this.songService.getFavorites(this.authService.getCurrentUserID())
                .subscribe( favorites => {
                    if(favorites.length > 0){
                        for(let fav of favorites){
                            for( let song of this.songList){
                                if(fav.id === song.id) {
                                    song.isFavorite = true;
                                }
                            }
                        }
                    }});        
        } else {
            let dataFavs = this.dataService.getFavorites();
            for(let fav of dataFavs){
                for( let song of this.songList){
                    song.isFavorite = (song.id === fav);
                }
            }
        }
    }

}