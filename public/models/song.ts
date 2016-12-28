export class Song {

        id: Number;
        album: String;
        artist: String;
        track: String;
        length: String;
        year: Number;
        thumb: String;
        isFavorite: boolean;

        constructor(id: Number, album: String
                    , artist: String, track: String
                    , isFav: boolean, length: String, year: Number, thumb: String){
            
            this.id = id;
            this.album = album;
            this.artist = artist;
            this.track = track;
            this.isFavorite = isFav;
            this.length = length;
            this.year = year;
            this.thumb = thumb;
        }
}