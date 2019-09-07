var React = require("react");
const cloudinary = require('cloudinary').v2;

var Navbar = require('./components/navbar.jsx');


class Gallery extends React.Component {
  render() {

    // console.log(this.props.username);

    const cards = this.props.photos.map(photo =>{
         return (
            <a href={`/gallery/${photo.id}`}>
                <div className = "cardBox_wrapper">
                    <div className="photo_wrapper">
                        <img src={cloudinary.url(photo.public_id)} />
                        <span className="details" id="photo_caption">{photo.caption}</span>
                    </div>
                    {/*<div className="details_wrapper">
                        <span className="details"><box-icon name='camera' ></box-icon>{photo.camera}</span>
                        <span className="details"><box-icon name='aperture'></box-icon>{photo.aperature}</span>
                        <span className="details"><box-icon name='timer'></box-icon>{photo.shutter}</span>
                        <span className="details"><box-icon name='disc' ></box-icon>{photo.iso}</span>
                    </div>*/}
                </div>
            </a>
        )
    })

    return (
      <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/css/navbar.css"/>
            <link rel="stylesheet" type="text/css" href="/css/home.css"/>
            <link rel="stylesheet" type="text/css" href="/css/gallery.css"/>
            <link href="https://fonts.googleapis.com/css?family=Abel|Caveat&display=swap" rel="stylesheet"/>
        </head>
        <body>
            <header>
              <Navbar/>
            </header>
            <div className="main_content_wrapper">
              <div className="main_cards_wrapper">
                  {cards}
              </div>
          </div>
          <footer>*This is a student project. Photographs used are properties of their individual photographers and are not of mine.</footer>
          <script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>
          <script src="/script.js"></script>
          </body>
      </html>
    );
  }
}

module.exports = Gallery;
