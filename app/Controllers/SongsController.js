import songService from "../Services/SongsService.js";
import { ProxyState } from "../AppState.js"
import Song from "../Models/Song.js";

function _drawActiveSong() {
  let activeSong = ProxyState.activeSong
  console.log('draw an active song', activeSong)
  document.getElementById('active-song').innerHTML = activeSong.Template

}


function _drawResults() {
  let template = ``
  ProxyState.songs.forEach(s => template += `<li class="selectable" onclick="app.songsController.activeSong('${s.id}')">${s.artist}| ${s.title}</li>`)
  document.getElementById('songs').innerHTML = template
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = ``
  ProxyState.playlist.forEach(p => template += p.playlistTemplate)
  document.getElementById('playlist').innerHTML = template
}
async function _getPlaylist() {
  try {
    await songService.getPlaylist()
  } catch (error) {
    console.error(error);
  }
}


export default class SongsController {
  constructor() {
    ProxyState.on('songs', _drawResults)
    ProxyState.on('activeSong', _drawActiveSong)
    ProxyState.on('playlist', _drawPlaylist)
    _getPlaylist()


  }

  activeSong(id) {
    songService.activeSong(id)
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
  
   */
  async addToPlaylist() {
    try {
      await songService.addToPlaylist()
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  async removeSong(id) {
    try {
      if (await window.confirm('You sure bro?')) {
        await songService.removeSong(id)
      }
    } catch (error) {
      console.error(error);
    }
  }
}
