import React, { Component } from 'react';
import './App.css';

function PlayButton(props) {
  const className = props.isMusicPlaying ? 'play active' : 'play';
  return <a onClick={props.onClick} href="#" title="Play video" className={className} />;
}
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMusicPlaying: false };
  }
  
  handleClick() {
    if (this.state.isMusicPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.setState(prevState => {
      return {
        isMusicPlaying: !prevState.isMusicPlaying
      };
    });
  };
  render() {
    return (
      <div>
        <PlayButton
          onClick={this.handleClick.bind(this)}
          isMusicPlaying={this.state.isMusicPlaying}
        />
        <audio id="audio" ref={(audioTag) => { this.audio = audioTag }} />
        <div id="container">
          <div id="hook"></div>
          <h1>Play Music</h1>
          <input type="file" id="files" name="files[]" multiple />
        </div>
      </div>
    );
  }
}

export default Container