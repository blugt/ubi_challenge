import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as Rx from 'rxjs';

import { Song } from '../models/song';

@Injectable()
export class SongsService {

    private _apiUrl: string = '/api';
    private _songs = new Rx.Subject<Song[]>();

    constructor( private http: Http ) {}

    songs$ = this._songs.asObservable();

    getSongs() {
       this.http.get(`${this._apiUrl}/songs`)
            .map( (response) => response.json())
            .subscribe( array => this._songs.next(array) );
    }

    getSongsWithFavorites(uid: string) {

        this.http.get(`${this._apiUrl}/songs`)
            .map( (response) => response.json())
            .flatMap(songsList => {
                let fJoin = Rx.Observable.forkJoin(
                    Rx.Observable.of(songsList),
                    this.getFavorites(uid));

                return fJoin;
            } )
            .map(fullSongs => {
                    let songs = fullSongs[0];
                    let favorites = fullSongs[1];
                    for( let song of songs ) {
                        if( favorites.find(fav => song.id === fav.id) ){
                            song.isFavorite = true;
                        }
                    }
                    return songs;
                })
            .subscribe(songs => {
                this._songs.next(songs)
            } );
            
    }

    getFavorites(id: string) {
        return this.http.get(`${this._apiUrl}/users/${id}/songs`)
            .map( (response) => response.json());
    }

    getSong(id: string): Rx.Observable<Song> {
        return this.http.get(`${this._apiUrl}/songs/${id}`)
            .map( (response) => {
                return response.json();
            });
    }

    addFavorite(uid: string, sid: string): Rx.Observable<boolean> {
        return this.http.post(`${this._apiUrl}/users/${uid}/songs`, {musicid: sid})
            .map( (response) => response.status === 200)
            .catch(this.errorHandling);
    }

    removeFavorite(uid: string, sid: string): Rx.Observable<boolean> {
        return this.http.delete(`${this._apiUrl}/users/${uid}/songs/${sid}`)
            .map( (response) => response.status === 200)
            .catch(this.errorHandling);
    }

    errorHandling(error: Response | any) {
        if( error instanceof Response ) {
            let errorText = '';
            if( error.status === 409 ) {
                errorText = 'Favorite already added';
            } else if( error.status === 404 ) {
                errorText = 'Couldn\'t remove favorite';
            }
            return Rx.Observable.throw(errorText);
        }
    }
}