var React = require("react");
const cloudinary = require('cloudinary').v2;
var THREE = require('three');

var Navbar = require('./components/navbar.jsx');
// var ThreeJS = require('./components/threejs.jsx');
// import {App} from './components/threejs.jsx';

class Home extends React.Component {


  render() {

    // console.log(this.props.username);
                {/*<img src="/camera_01.png" id="header_img"/>*/}

    return (
      <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link href="https://fonts.googleapis.com/css?family=Abel|Anton|Caveat|Bevan&display=swap" rel="stylesheet"/>
            <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/css/navbar.css"/>
            <link rel="stylesheet" type="text/css" href="/css/home.css"/>

        </head>
        <body>
            <header>
              <Navbar/>
            </header>
          {/*<h3>Hello, {this.props.username}</h3>*/}

          {/*<img src={cloudinary.url(this.props.profile_pic)}/>*/}
          <div className="main_content_wrapper">
            <div id="logo"><img src="/logo2.png"/></div>
              <div id="threeDcamera_wrapper">
                <iframe title="A 3D model" src="https://sketchfab.com/models/00977989eef4469bb813d4637a6375b1/embed" frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true">
                </iframe>
              </div>
              <div id="scroll"><div>Scroll Down</div><img src="/arrow_down.gif" style={{width:"30px"}}/></div>
              <div className="tabs" id="shutter">
                <div className="description">
                    <h1 data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">SHUTTER SPEED</h1>
                    <p data-aos="fade-up" data-aos-duration="2000">This is the <span style={{fontWeight:"900", color:"#f73838"}}>amount of time that your camera’s shutter is open</span>, exposing light on each frame. <br/>For instance, a shutter set to 1/60 is letting in light at 1/60th of a second during each frame. The higher the shutter speed, the more crisp and “jittery” your footage will look, and the sharper your photos will be.
                    </p>
                </div>
                    <img src='https://www.shutterbug.com/images/styles/600_wide/public/promoss71017.jpg' id="shutterimage_one" data-aos="fade-left" data-aos-duration="3000" ata-aos-delay="50"/>
                <img src='https://najanorazman.weebly.com/uploads/5/0/5/4/50540085/3661865_orig.jpg' id="shutterimage_two" data-aos="fade-up" data-aos-duration="3000"/>
              </div>

              <div className="tabs" id="aperture">
                <div className="description">
                    <h1 data-aos="fade-down" data-aos-duration="1000" data-aos-easing="linear" >APERTURE</h1>
                    <p data-aos="fade-up" data-aos-duration="2000">The aperture is <span style={{fontWeight:"900", color:"#f73838"}}>the size of your lens’ opening</span>, and is usually a set of blades or a diaphragm that allows light to pass through to your sensor. This is similar to the iris of a human eye, constricting and opening to control the amount of light that goes through the lens. The smaller the number, called “f-stop” or “t-stop,” the larger the opening of the aperture, and vice versa.
                    </p>
                </div>
                <img src='https://i.ytimg.com/vi/5sT1wo0x4JE/maxresdefault.jpg' id="apertureimage_two" data-aos="fade-up" data-aos-duration="3000"/>
                <img src='https://d25tv1xepz39hi.cloudfront.net/2016-12-13/files/ef-50mm-f1-8-stm-sample-image_1438b.jpg' id="apertureimage_one" data-aos="fade-right" data-aos-duration="3000" ata-aos-delay="50"/>
              </div>
              <div className="tabs" id="iso" >
                <div className="description">
                    <h1 data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">ISO</h1>
                    <p data-aos="fade-up" data-aos-duration="2000">ISO is your <span style={{fontWeight:"900", color:"#f73838"}}>camera sensor’s sensitivity to light.</span> The more your ISO increases, the more your camera’s sensor will boost the brightness of the image. At a certain point, visible “noise” or “grain” will be added to compensate for the lack of light, so try to keep your ISO as low as possible to reduce the amount of distortion, while going high enough to actually see your subject.
                    </p>
                </div>
                <img src='https://ugc.kn3.net/i/c_960x720/https://mott.pe/noticias/wp-content/uploads/2018/05/fotografiar-con-iso-alto-cuando-tienes-una-iluminacion-baja.jpg' id="isoimage_one" data-aos="fade-right" data-aos-duration="3000" ata-aos-delay="50"/>
                <img src='https://www.allinebelotto.com.br/wp-content/uploads/2017/01/foto-1-iso.jpg' id="isoimage_two" data-aos="fade-up" data-aos-duration="3000"/>
              </div>
                <div className="tabs" id="view_photos">
                    <a href="/gallery" style={{textDecoration:"none"}}><div id="text_wrapper">
                        <h1 className="text-one" data-aos="fade-right">LET'S VIEW</h1>
                        <h1 className="text-two" data-aos="fade-right" data-aos-delay="50">SOME WORKS</h1>
                        <div className="text-three" data-aos="fade-right" data-aos-delay="100">
                            <h1>OF ART</h1> <h1 data-aos="fade-right" id="arrow">>></h1>
                        </div>
                    </div></a>
                    <div id="footer" data-aos="fade-up" data-aos-offset="0">
                        <Navbar/>
                    </div>
                </div>
          </div>
            <script>AOS.init();</script>
            <script src="//cdn.rawgit.com/mrdoob/three.js/master/build/three.min.js"></script>
            <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
            <script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>
            <script src="/script.js"></script>

          </body>
      </html>
    );
  }
}

module.exports = Home;
