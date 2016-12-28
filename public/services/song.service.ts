import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SongService {

    constructor(private http: Http) {}

    getSongs() {
        return this.http.get('/api/songs')
            .map(response => {
                return response.json();
            });
    }

    getSong(id: String) {
        return this.http.get(`/api/songs/${id}`)
            .map( response => {
                if(response.status === 200) {
                    return response.json();
                } else{
                    return null;
                }
            });
    }

    getFavorites(userID: String) {
        return this.http.get(`/api/users/${userID}/songs`)
            .map((response) => {
                return response.json();
            });
    }

    addFavorite(userID: String, songID: Number) {
        let resp = this.http.post(`/api/users/${userID}/songs`,{
            musicid: songID
        }).map( response => {
            return response.status === 200;
        }).share();

        resp.subscribe(response => {

        }, err => {
            console.log(err);
        }, ()=>{});

        return resp;
    }

    removeFavorite(userID: String, songID: Number) {
        return this.http.delete(`/api/users/${userID}/songs/${songID}`,{})
        .map( response => {
            return response.status === 200;
        });
    }

}