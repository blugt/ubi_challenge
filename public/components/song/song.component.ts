import { Component } from "@angular/core";

@Component({
    selector: 'song',
    templateUrl: 'song.component.html'
})
export class SongComponent {
    
    id: Number = 0;
    title: String = "Some song";
    artist: String = "Some artist";

    addToFavorites() {
        
    }
}