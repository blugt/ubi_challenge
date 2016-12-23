import { Component, Input } from '@angular/core';
import { Song } from '../../models/song';

@Component({
    selector: 'song-details',
    templateUrl: 'song-details.component.html'
})
export class SongDetailsComponent {
    @Input()
    song: Song;
}