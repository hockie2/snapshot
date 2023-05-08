var React = require("react");
const cloudinary = require('cloudinary').v2;

var Navbar = require('./components/navbar.jsx');

class Gallery extends React.Component {


  render() {

    let cards = <h3>Start adding your works of art</h3>;

    if(this.props.photos){
         cards = this.props.photos.map(photo =>{
             return (

                <div className = "cardBox_wrapper" id={'photo'+ photo.id}>
                    <a href={`/gallery/${photo.id}`}>
                        <div className="photo_wrapper">
                            <img src={cloudinary.url(photo.public_id)} />
                            <span className="details" id="photo_caption">{photo.caption}</span>
                        </div>
                    </a>
                    <div className="controls">
                        <form action={"/gallery/"+ photo.id + "/edit"} method="PUT" id="editform">
                            <button type="submit" value="Edit" id="edit">Edit</button>
                        </form>
                        <span>|</span>

                        <button type="submit" value="Delete" className="delete" photoId={photo.id}>Delete</button>


                    </div>
                </div>
            )
        })
    }

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
                <div className="name">
                    <h3>Photographer</h3>
                    <h5>{this.props.username}</h5>
                </div>
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

module.exports = Gallery;
                        // <form action={"/gallery/"+ photo.id +"?_method=DELETE"} method="POST" id="deleteform"/>
