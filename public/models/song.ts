export class Song {

        id: Number;
        album: String;
        artist: String;
        track: String;

        constructor(id: Number, album: String
                    , artist: String, track: String){
            
            this.id = id;
            this.album = album;
            this.artist = artist;
            this.track = track;
        }
}