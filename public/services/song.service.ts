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

    getFavorites(userID: String) {
        return this.http.get(`/api/users/${userID}/songs`)
            .map((response) => {
                return response.json();
            });
    }

    addFavorite(userID: String, songID: Number) {
        return this.http.post(`/api/users/${userID}/songs`,{
            musicid: songID
        }).map( response => {
            return response.status === 200;
        });
    }

    removeFavorite(userID: String, songID: Number) {
        return this.http.delete(`/api/users/${userID}/songs/${songID}`,{})
        .map( response => {
            return response.status === 200
        });
    }

}