export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId?.toString() || data.id;
  }

  get Template() {
    return `
         <div class="col-3 shadow bg-light rounded p-2">
          <img class="img-fluid" src="${this.albumArt}" alt="photo">
          <h4>${this.title} | ${this.artist} | ${this.album}</h4>
          <audio controls src="${this.preview}"> </audio>
          <div class="d-flex justify-content-end">
            <button class="btn btn-success p-2" onclick="app.songsController.addToPlaylist()">add to playlist</button>
          </div>
         </div>
        `;
  }

  get playlistTemplate() {
    return `
         <ul>
          <li> <img class = " h-25 w-25" src="${this.albumArt}" alt="">${this.title}<i class="mdi mdi-delete" onclick="app.songsController.removeSong('${this.id}')" ></i> </li>
        </ul>
        `;
  }
}
