import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../models/song';
import { DataService } from '../../services/data.service';
import { SongService } from '../../services/song.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'song-details',
    templateUrl: './song-details.component.html',
    providers: [SongService]
})
export class SongDetailsComponent implements OnInit {

    song: Song;

    constructor(private route: ActivatedRoute, private songService: SongService ) {}

    ngOnInit() {
        let id = this.route.snapshot.params['id'];

        this.songService.getSong(id)
            .subscribe( song => {
                if(song) {
                    this.song = song[0];
                }
            });
    }


    
}