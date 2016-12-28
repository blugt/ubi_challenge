import { Injectable } from '@angular/core';
import { Song } from './../models/song'; 

@Injectable()
export class DataService {

    currentSong: Song;
    currentFavorites: Number[] = [];

    getCurrentStoredSong(songID): Song {
        return this.currentSong;
    }

    storeNewSong(song: Song) {
        this.currentSong = song;
    }

    storeFavorite(favs: Number) {
        this.currentFavorites.push(favs);
    }

    removeFavorite(id: Number) {
        let found = this.currentFavorites.findIndex(f => {
            return f === id;
        });
        if(found > -1){
            this.currentFavorites.splice(found, 1);
        }
    }

    clearFavorites() {
        this.currentFavorites = [];
    }

    getFavorites(): Number[] {
        return this.currentFavorites;
    }

}