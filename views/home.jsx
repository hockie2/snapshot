var React = require("react");
const cloudinary = require('cloudinary').v2;

var Navbar = require('./components/navbar.jsx');


class Home extends React.Component {
  render() {

    // console.log(this.props.username);

    return (
      <html>
        <head>

            <link rel="stylesheet" type="text/css" href="/css/navbar.css"/>
            <link rel="stylesheet" type="text/css" href="/css/home.css"/>

        </head>
        <body>
            <header>
              <Navbar/>
            </header>
          <h3>Hello, {this.props.username}</h3>
          <img src={cloudinary.url(this.props.profile_pic)}/>
          <script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>
          <script src="/script.js"></script>

          </body>
      </html>
    );
  }
}

module.exports = Home;
