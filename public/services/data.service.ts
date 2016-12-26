import { Injectable } from '@angular/core';
import { Song } from './../models/song'; 

@Injectable()
export class DataService {

    song: Song;

    getCurrentStored(songID): Song {
        return this.song;
    }

    storeNew(song: Song) {
        this.song = song;
    }

}