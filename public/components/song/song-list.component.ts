import { Component } from '@angular/core';
import { SongComponent } from './song.component';
import { SongService } from './song.service';

@Component({
    selector: 'song-list',
    templateUrl: 'song-list.component.html'
})
export class SongListComponent {
    
    songList = [];

    constructor(private songSrv: SongService) {
    }

    ngOnInit() {

    }
}