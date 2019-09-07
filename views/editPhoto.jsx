var React = require("react");
const cloudinary = require('cloudinary').v2;

var Navbar = require('./components/navbar.jsx');

class EditPhoto extends React.Component {
  render() {
    // console.log(this.props.photos.id);
        // var edit_url = "/gallery/"+this.props.photos.id + "/edit";
        // var delete_url = "/gallery/"+this.props.photos.id +"?_method=DELETE";


    return (
      <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/css/navbar.css"/>
            <link rel="stylesheet" type="text/css" href="/css/home.css"/>
            <link rel="stylesheet" type="text/css" href="/css/editPhoto.css"/>
            <link href="https://fonts.googleapis.com/css?family=Abel|Audiowide|Bevan|Caveat&display=swap" rel="stylesheet"/>
        </head>
        <body>
            <header>
              <Navbar/>
            </header>
            <div className="main_content_wrapper">
                <h3>EDIT PHTOT</h3>

              <div className="main_cards_wrapper">
                    <img src={cloudinary.url(this.props.photos.public_id)} />
                <form  method="POST">
                    <p>Caption</p><input name="caption" defaultValue={this.props.photos.caption}></input>
                    <p>Camera</p><input name="camera" defaultValue={this.props.photos.camera}></input>
                    <p>Aperture</p><input name="aperture" defaultValue={this.props.photos.aperture}></input>
                    <p>Shutter</p><input name="shutter" defaultValue={this.props.photos.shutter}></input>
                    <p>ISO</p><input name="iso" defaultValue={this.props.photos.iso}></input>

                    <p><button type="submit" name="submit" className="submitButton">Submit</button></p>
                </form>
              </div>
          </div>
          <script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>
          <script src="/script.js"></script>
          </body>
      </html>
    );
  }
}

module.exports = EditPhoto;
