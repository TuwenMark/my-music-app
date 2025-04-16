export interface Track {
  id: string;
  name: string;
  al: {
    picUrl: string;
  };
  ar: {
    name: string;
  }[];
}

export interface NeteasePlaylist {
  id: string;
  name: string;
  picUrl: string;
  creator: NeteaseUser;
}

export interface NeteaseUser {
  userId: string;
  nickname: string;
  avatarUrl: string;
}

export interface NeteaseResponse {
  recommend: NeteasePlaylist[];
}

export interface NeteasePlaylistDetail {
  playlist: {
    id: string;
    name: string;
    coverImgUrl: string;
    creator: {
      nickname: string;
    };
    tracks: Track[];
  };
}

export interface NeteaseSongDetail {
  songs: Track[];
}
