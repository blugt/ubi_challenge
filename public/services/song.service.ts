import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class SongService {

    constructor(private http: Http) {}

    getSongs() {
        return this.http.get('/api/songs')
            .map(response => {
                return response.json();
            });
    }

    getFavorites(userID: Number) {
        return this.http.get(`/api/users/${userID}/songs`)
            .map((response) => {
                return response.json();
            });
    }

    addFavorite(userID: Number, songID: Number) {
        
    }

    removeFavorite(userID: Number, songID: Number) {

    }

}