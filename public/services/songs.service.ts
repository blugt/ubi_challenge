import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Rx from 'rxjs';

import { Song } from '../models/song';

@Injectable()
export class SongsService {

    private _apiUrl: string = '/api';

    constructor( private http: Http ) {}

    getSongs(): Rx.Observable<any> {
       return this.http.get(`${this._apiUrl}/songs`)
            .map( response => response.json());
    }

    getFavorites(id: string): Rx.Observable<any> {
        return this.http.get(`${this._apiUrl}/users/${id}/songs`)
            .map( response => {
                if(response.json() === null){
                    return [];
                } else {
                    return response.json();
                }
            });
    }

    getSong(id: string): Rx.Observable<Song> {
        return this.http.get(`${this._apiUrl}/songs/${id}`)
            .map( response => {
                return response.json();
            });
    }

    addFavorite(uid: string, sid: string): Rx.Observable<boolean> {
        return this.http.post(`${this._apiUrl}/users/${uid}/songs`, {musicid: sid})
            .map( response => response.status === 200);
    }

    removeFavorite(uid: string, sid: string): Rx.Observable<boolean> {
        return this.http.delete(`${this._apiUrl}/users/${uid}/songs/${sid}`)
            .map( response => response.status === 200);
    }
}