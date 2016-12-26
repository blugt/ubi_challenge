import { Component, OnInit } from '@angular/core';
import { SongComponent } from './song.component';
import { SongService } from './../../services/song.service';
import { Song } from '../../models/song';


@Component({
    selector: 'song-list',
    providers: [SongService],
    templateUrl: '/song-list.component.html'
})
export class SongListComponent implements OnInit {
    
    songList: Song[] = [];

    constructor(private songService: SongService) {}

    ngOnInit() {
        this.songService.getSongs()
            .subscribe( songs => {
                for(let song of songs ) {
                    this.songList.push(song);
                }
            });
    }

}