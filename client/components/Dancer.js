import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Dancer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsive: false,
      autoplay: false,
      slideCount: 0
    };
    this.onPlay = this.onPlay.bind(this);
  }

  onPlay(){
    let { autoplay, slideCount } =this.state;
    if(autoplay){
      this.setState({autoplay:false});
      clearInterval(this.interval);
    } else {
      this.setState({autoplay:true});
      this.interval = setInterval(()=>{
        const imageTotal = this.props.dancerImages.length - 1;
        if(slideCount>imageTotal){
          slideCount = 0;
         this.setState({slideCount:slideCount});
        } else {
         return this.setState({slideCount:slideCount++});
        }
      }, 180);
    }
  }

  render() {
    const { dancerImages, dancer } = this.props;
    const { autoplay, slideCount } = this.state;
    const { onPlay } = this;
    const playButton = autoplay === true ? 'Pause' : 'Play';
    if (dancerImages.length === 0) {
      return (
        <div className="container">
          <h2>{dancer && dancer.name}</h2>
          <Link to='/images/create' className="btn btn-outline-dark float-right">Add Images</Link>
        </div>
      );
    }
    return (
      <div className="container">
        <Link to='/images/create' className="btn btn-outline-dark float-right">Add Images</Link>
        <h2 className='titles' >{dancer && dancer.name}</h2>
        <hr />

        <button onClick={onPlay}>{playButton}</button>
        {/* className breaks this^ button? */}
        <div className='fadein'>
          {dancerImages &&
            dancerImages.map((image, index) => {
              const className = slideCount === index ? "" : "is-hidden";
              return (
                <div key={image.id} >
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
