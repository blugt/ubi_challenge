import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

export class SongService {

    constructor(private http: Http) {

    }

    getSongs() {
        return this.http.get('/api/musics')
            .map(response => {
                return response.json().musics;
            });
    }

    addToFavorites(userID, songID) {
        return this.http.put('')
    }

    removeFromFavorites(userID, songID) {

    }
}