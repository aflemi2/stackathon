import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Dancer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsive: false,
      autoplay: false,
      slideCount: 0,
      music: false
    };
    this.onPlay = this.onPlay.bind(this);
    this.onListen = this.onListen.bind(this);
    this.onMediaStream = this.onMediaStream.bind(this);
    this.onAudioProcess = this.onAudioProcess.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.onMusic = this.onMusic.bind(this);
  }

  componentDidMount(){
    this.audio = new Audio('/audio/superstarpartzero.mp3');
  }

  componentWillUnmount() { //Toggles setInterval off when user leaves page.
    clearInterval(this.interval);
    if (this.audio) {this.audio.pause();}
    if (this.audioContext) { this.audioContext.close(); }
  }

  onMusic() {
    let { music } = this.state;
    Audio.prototype.stop = function() {
      this.pause();
      this.currentTime = 0;
  };
    if(music){
       if(this.audio){
      this.audio.stop();
    }
      this.setState({music: false});
    } else {
      this.audio.play();
      this.setState({music:true});
    }
  }

  onPlay() { //Auto play images in order.
    let { autoplay, slideCount } = this.state;
    if (autoplay) {
      this.setState({ autoplay: false });
      clearInterval(this.interval);
    } else {
      this.setState({ autoplay: true });
      this.interval = setInterval(() => {
        const imageTotal = this.props.dancerImages.length - 1;
        if (slideCount >= imageTotal) {
          slideCount = 0;
          this.setState({ slideCount: slideCount });
        } else {
          return this.setState({ slideCount: slideCount++ });
        }
      }, 180);
    }
  }

  onListen() { //Animate images with audio input from mic.
    if (!this.state.responsive) {
      this.audioContext = new AudioContext();
      navigator.getUserMedia({ audio: true }, this.onMediaStream, (err) => console.log(err));
      this.setState({ responsive: true });
    } else {
      if (this.audioContext) { this.audioContext.close(); }
      this.setState({ responsive: false });
    }
  }

  onMediaStream(stream) { // Connects audio stream to be processed.
    const mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
    const processor = this.audioContext.createScriptProcessor();
    processor.volume = 0;
    processor.onaudioprocess = this.onAudioProcess;
    processor.connect(this.audioContext.destination);

    mediaStreamSource.connect(processor);
  }

  onAudioProcess(e) { // Processes the first channel to create an audio snippet(buffer)
    const buffer = e.inputBuffer.getChannelData(0);
    let sum = 0;
    let x;

    for (let i = 0; i < buffer.length; i++) {
      x = Math.abs(buffer[i]);
      sum += x * x;
    }

    let average = sum / buffer.length;

    if (Math.floor(average * 1500) > 100) { //Buffer length(Audio frames) is above 100 change image.
      this.changeImage();
    }
  }

  changeImage() {
    let { slideCount } = this.state;
    const imageTotal = this.props.dancerImages.length - 1;
    if (slideCount >= imageTotal) {
      slideCount = 0;
      this.setState({ slideCount: slideCount });
    } else {
      slideCount++;
      this.setState({ slideCount: slideCount });
    }
  }

  render() {
    const { dancerImages, dancer } = this.props;
    const { autoplay, slideCount, responsive, music } = this.state;
    const { onPlay, onListen, onMusic } = this;
    const playButton = autoplay === true ? 'Pause' : 'Auto Play';
    const toggleButton = responsive ? 'Mic Off' : 'Mic On';
    const musicButtonClass = music ? 'playing' : '';
    if (dancerImages.length === 0) {
      return (
        <div className="container">
          <h2>{dancer && dancer.name}</h2>
          <Link to='/images/create' className="btn btn-outline-dark float-right">Add Images</Link>
        </div>
      );
    }

    return (
      <div className="container main">
        {/* <Link to='/images/create' className="btn btn-outline-dark float-right">Add Images</Link> */}        <h5>Click 'Auto Play' to animate the character automatically.</h5>
        <h5>Click 'Mic On' to animate in response to sounds.</h5>
        <br />
        <h2 className='titles' >{ dancer && dancer.name }</h2>
        <hr />
        <button onClick = { onPlay }>{ playButton }</button>
        <button onClick = { onListen } id = "toggle-button">{ toggleButton }</button>
        <div className='float-right'>
          <h3 className='titles'>Play Music</h3>
          <img onClick = {onMusic} src='/images/DJ_Turntable.png' className={musicButtonClass} />
        </div>
        <div className='fadein'>
          {dancerImages &&
            dancerImages.map((image, index) => {
              const className = slideCount === index ? "" : "is-hidden";
              return (
                <div className='main' key={image.id} >
                  <img className={className} src={image.name} />
                  <br />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ images, dancers }, { id, history }) => {
  const dancer = dancers.find(dancer => dancer.id === id);
  const dancerImages = images.filter(image => image.dancerId === id);
  return {
    dancerImages,
    dancer,
    history
  };
};

export default connect(mapStateToProps)(Dancer);
