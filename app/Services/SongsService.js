import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  async getPlaylist() {
    const res = await sandBoxApi.get()
    ProxyState.playlist = res.data.map(p => new Song(p))
  }

  async addToPlaylist() {
    let addedSong = ProxyState.activeSong
    const res = await sandBoxApi.post('', addedSong)
    console.log('song added to sandbox', res.data);
    ProxyState.playlist = [new Song(res.data), ...ProxyState.playlist]
  }


  activeSong(id) {
    const song = ProxyState.songs.find(s => s.id == id)
    console.log("active song", song);
    ProxyState.activeSong = song
  }


  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        res.results = res.results.filter(s => s.wrapperType != 'audiobook')
        ProxyState.songs = res.results.map(rawData => new Song(rawData))
        console.log(res.results)
      })
      .catch(err => {
        throw new Error(err);
      });
    ;
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    //TODO What are you going to do with this result
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  addSong(id) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    const res = await sandBoxApi.delete(id)
    console.log('song deleted', id)
    ProxyState.playlist = ProxyState.playlist.filter(p => p.id != id)
  }
}

const service = new SongsService();
export default service;
