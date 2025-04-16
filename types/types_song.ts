export interface Playlist {
  id: string;
  name: string;
  image_url: string;
  creator: string;
  songs: Song[];
}

export interface Song {
  id: string;
  name: string;
  image_url: string;
  author: string;
}
