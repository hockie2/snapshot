var React = require("react");
const cloudinary = require('cloudinary').v2;

var Navbar = require('./components/navbar.jsx');


class Photographer extends React.Component {
  render() {

    // console.log(this.props.photos);

    const cards = this.props.photos.map(photo =>{
         return (
            <a href={`/gallery/${photo.id}`}>
                <div className = "cardBox_wrapper">
                    <div className="photo_wrapper">
                        <img src={cloudinary.url(photo.public_id)} />
                        <span className="details" id="photo_caption">{photo.caption}</span>
                    </div>
                </div>
            </a>
        )
    })

    return (
      <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/css/navbar.css"/>
            <link rel="stylesheet" type="text/css" href="/css/home.css"/>
            <link rel="stylesheet" type="text/css" href="/css/dashboard.css"/>
            <link href="https://fonts.googleapis.com/css?family=Abel|Audiowide|Bevan|Caveat&display=swap" rel="stylesheet"/>
        </head>
        <body>
            <header>
              <Navbar/>
            </header>
            <div className="main_content_wrapper">
                <h3>Photographer</h3>
                <h5>{this.props.username}</h5>
              <div className="main_cards_wrapper">
                  {cards}
              </div>
          </div>
          <script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>
          <script src="/script.js"></script>
          </body>
      </html>
    );
  }
}

module.exports = Photographer;
