var React = require("react");

class Navbar extends React.Component {
  render() {

    // console.log(this.props.cookieUserName)

    return (


        <div id="nav_wrapper">
            <div className="nav_left">
                <a className="active" href="/"><div className="nav_button">Home</div></a>
                <a href="/gallery" ><div className="nav_button">Gallery</div></a>
                <a href="/dashboard" ><div className="nav_button" id="dashboard">My Dashboard</div></a>
                <a href="/gallery/addphoto"><div className="nav_button" id="addphoto"><box-icon name='plus-circle' type='solid' color='#ffffff' ></box-icon>Add Photos</div></a>

            </div>

            <div className="nav_right">
                <a href="/register"><div className="nav_button"><box-icon name='key' color='#ffffff' ></box-icon>Register</div></a>

                <div id="loginbutton">
                <a href="/login" ><div className="nav_button"><box-icon name='user' type='solid' color='#ffffff' ></box-icon>Login</div></a>
                </div>


            </div>

        </div>

      );
}
}

module.exports = Navbar;
