// Image animate component
const FadeImage = React.createClass({
  displayName: 'FadeImage',
  propTypes: Image.propTypes,
  getInitialState() {
    return {
      opacity: new Animated.Value(0)
    };
  },
  setNativeProps(nativeProps) {
    this._image.setNativeProps(nativeProps);
  },
  fadeIn() {
    Animated.spring(this.state.opacity, {
      toValue: 1,
      friction: 10,
      tension: 60
    }).start();
  },
  render() {
    return (
      <Animated.View style={{opacity: this.state.opacity}}>
        <Image {...this.props} onLoad={this.fadeIn} ref={component => this._image = component} />
      </Animated.View>
    );
  }
});

//_______________CSS slideshow option
//js
 $("#slideshow > div:gt(0)").hide();

setInterval(function() {
  $('#slideshow > div:first')
    .fadeOut(10)
    .next()
    .fadeIn(10)
    .end()
    .appendTo('#slideshow');
}, 200);
//css
#slideshow {
  margin: 80px auto;
  position: relative;
  width: 240px;
  height: 240px;
  padding: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

#slideshow > div {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
}
//html
{/* <div id="slideshow">
   <div>
     <img src="http://farm6.static.flickr.com/5224/5658667829_2bb7d42a9c_m.jpg">
   </div>
   <div>
     <img src="http://farm6.static.flickr.com/5230/5638093881_a791e4f819_m.jpg">
   </div>
   <div>
     Pretty cool eh? This slide is proof the content can be anything.
   </div>
</div> */}


//css slideshow without jquery______________
<ul id="slides">
	<li class="slide showing">Slide 1</li>
	<li class="slide">Slide 2</li>
	<li class="slide">Slide 3</li>
	<li class="slide">Slide 4</li>
	<li class="slide">Slide 5</li>
</ul>
//css
/*
essential styles:
these make the slideshow work
*/
#slides{
	position: relative;
	height: 150px;
	padding: 0px;
	margin: 0px;
	list-style-type: none;
}

.slide{
	position: absolute;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	opacity: 50;
	z-index: 1;

	-webkit-transition: opacity 1s;
	-moz-transition: opacity 1s;
	-o-transition: opacity 1s;
	transition: opacity 1s;
}

.showing{
	opacity: 1;
	z-index: 2;
}



/*
non-essential styles:
just for appearance; change whatever you want
*/

.slide{
	font-size: 40px;
	padding: 40px;
	box-sizing: border-box;
	background: #333;
	color: #fff;
}

.slide:nth-of-type(1){
	background: red;
}
.slide:nth-of-type(2){
	background: orange;
}
.slide:nth-of-type(3){
	background: green;
}
.slide:nth-of-type(4){
	background: blue;
}
.slide:nth-of-type(5){
	background: purple;
}

//js
var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,400);

function nextSlide(){
	slides[currentSlide].className = 'slide';
	currentSlide = (currentSlide+1)%slides.length;
	slides[currentSlide].className = 'slide showing';
}
