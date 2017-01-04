import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../models/song';
import { SongsService } from '../../services/songs.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'song-details',
    templateUrl: './song-details.component.html',
})
export class SongDetailsComponent implements OnInit {

    song: Song;

    constructor(private route: ActivatedRoute, private songsService: SongsService, private authService: AuthService ) {}

    ngOnInit() {

        let id = this.route.snapshot.params['id'];

        this.songsService.getSong(id)
            .subscribe( response => {
                this.song = response;
            })
    }
    
}