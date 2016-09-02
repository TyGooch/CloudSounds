import React from 'react';




class TrackItem  extends React.Component {

 constructor(props) {
   super(props);
   this.deleteThisTrack = this.deleteThisTrack.bind(this);
   this.generateWaveform = this.generateWaveform.bind(this);
 }
  deleteThisTrack() {
    this.props.deleteTrack(this.props.track);
    this.props.fetchUserTracks(this.props.currentUser.user);
  }
  addTracktoPlaylist(){
    $('ol').append(`<li class='playlist-item' data-src=${this.props.track.audio_url}>
        ${this.props.track.title}
    </li>`);
  }
  generateWaveform() {
    let that = this;
    var waveform = window.Wavesurfer.create({
      container: `#waveform-${this.props.track.id}`,
      maxCanvasWidth: (screen.width * 0.50),
      height: 45,
      waveColor: '#7EC0EE',
      cursorColor: 'transparent'
    });
    waveform.load(this.props.track.audio_url);
    waveform.on('ready', function () {
      $(`#waveform-${that.props.track.id}`).removeClass('hidden');
    });
  }

  componentDidMount(){
    this.generateWaveform();
    this.addTracktoPlaylist();
  }

  render() {return (
    <li key={this.props.track.id}>
      <div className="track-item">
        <img src={this.props.track.image_url.replace('upload', 'upload/w_160,h_160/r_10')} alt="" />
        <div className={"column " + "weather-" + this.props.track.weather_id + "-track"}>
          <div className = "flex-row">
            <button className="circle-play"
              id={this.props.track.id}
              data-src={this.props.track.audio_url}
              onClick={this.props.playTrack}>

            </button>
            <div className="info">
              <p className="track-user">
                {this.props.currentUser.user.username}
              </p>
              <p className="track-name">
                {this.props.track.title}
              </p>
            </div>
            <div className="icons">
              <img src={"http://res.cloudinary.com/cloud-sounds/image/upload/w_40,h_40/v1472690716/icon-" + this.props.track.weather_id} className='icon-40 favorite-icon' />
            </div>
          </div>
          <div className="track-description">
            <div className="waveform" id={'waveform-' + this.props.track.id}></div>
          </div>
          <input className="comment" type="text" placeholder="Write a comment"/>
          <ul className='track-item-buttons'>
            <button className='track-favorite'>24</button>
            <button className='track-delete' onClick={this.props.deleteThisTrack}></button>
          </ul>
        </div>
      </div>
    </li>);
  }
}

export default TrackItem;
//TODO: do something with description{track.description}
