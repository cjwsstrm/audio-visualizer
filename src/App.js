import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js'
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    // console.log(params);
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: {
        artist: 'Not Checked',
        song: 'Not Checked', 
        albumArt: '' }
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  };

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
    .then((response) => {
      console.log(response)
      this.setState({
        nowPlaying: {
          artist: response.item.artists[0].name,
          song: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
  };
  
  render() {
    return (
      <div>
        <a href='http://localhost:8888'> Login to Spotify </a>
        <h1> 
          Now Playing:
        </h1>
        <h2>
          { this.state.nowPlaying.artist } - { this.state.nowPlaying.song }
        </h2>
        <div>
          <img src={ this.state.nowPlaying.albumArt } style={{ height: 150 }} />
        </div>
        { this.state.loggedIn &&
        <button onClick={() => this.getNowPlaying()}>
          Check Now Playing
        </button>
      }
      </div>
    )
  }
}

export default App;
