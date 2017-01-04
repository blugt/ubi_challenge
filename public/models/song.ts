export class Song {

        id: string;
        album: string;
        artist: string;
        track: string;
        length: string;
        year: Number;
        thumb: string;
        isFavorite: boolean;

        constructor(id: string, album: string
                    , artist: string, track: string
                    , isFav: boolean, length: string, year: Number, thumb: string){
            
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