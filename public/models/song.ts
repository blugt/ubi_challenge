export class Song {

        id: Number;
        album: String;
        artist: String;
        track: String;
        isFavorite: boolean;

        constructor(id: Number, album: String
                    , artist: String, track: String, isFav: boolean){
            
            this.id = id;
            this.album = album;
            this.artist = artist;
            this.track = track;
            this.isFavorite = isFav;
        }
}