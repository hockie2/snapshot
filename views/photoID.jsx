var React = require("react");
const cloudinary = require('cloudinary').v2;

var Navbar = require('./components/navbar.jsx');


class PhotoID extends React.Component {
  render() {

    var post_comment = "/photoID/"+this.props.phototId +"?_method=POST";


    console.log(this.props.comments);
    let comments = this.props.comments.map(comment=>{
        return <div className="comment_box">
                    <img src={cloudinary.url(comment.public_id)} />
                    <div className="comment">{comment.comment}</div>
                </div>
    })

    return (
      <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/css/navbar.css"/>
            <link rel="stylesheet" type="text/css" href="/css/home.css"/>
            <link rel="stylesheet" type="text/css" href="/css/photoID.css"/>
            <link href="https://fonts.googleapis.com/css?family=Abel|Caveat&display=swap" rel="stylesheet"/>
        </head>
        <body>
            <header>
              <Navbar/>
            </header>
            <div className="main_content_wrapper">
                <div className="main_card_wrapper">
                    <div className="photo_wrapper">
                        <img src={cloudinary.url(this.props.photos.public_id)} />
                        <span className="details" id="photo_caption">{this.props.photos.caption}</span>
                    </div>
                    <div className="details_wrapper">
                        <span className="details"><box-icon name='camera' ></box-icon>{this.props.photos.camera}</span>
                        <span className="details"><box-icon name='aperture'></box-icon>{this.props.photos.aperature}</span>
                        <span className="details"><box-icon name='timer'></box-icon>{this.props.photos.shutter}</span>
                        <span className="details"><box-icon name='disc' ></box-icon>{this.props.photos.iso}</span>
                    </div>
                </div>
                <div className="comment_input">
                    <img src={cloudinary.url(this.props.photos.user_public_id)} />
                    <form  method="POST" id="new_comment">
                            <textarea action={post_comment} rows="5" cols="20" name="comment_textarea" id="comment_textarea"></textarea>
                    </form>
                </div>
                <div className="comments_wrapper">
                    {comments}
                </div>
            </div>
          <script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>
          <script src="/script.js"></script>

          </body>
      </html>
    );
  }
}

module.exports = PhotoID;
