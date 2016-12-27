import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../models/song';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'song-details',
    templateUrl: './song-details.component.html'
})
export class SongDetailsComponent implements OnInit {

    song: Song;

    constructor(private route: ActivatedRoute, private dataService: DataService) {}

    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        this.song = this.dataService.getCurrentStored(id);
    }
}