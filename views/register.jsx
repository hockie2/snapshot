var React = require("react");
var Navbar = require('./components/navbar.jsx');

class ShowRegisterForm extends React.Component {
  render() {
    // console.log(this.props.profile_pic);
    // let images = this.props.profile_pic.map(image=>{
    //     return <div><img src={image.public_id}/></div>

    // })

    return (
            <html>
        <head>
            <link href="https://fonts.googleapis.com/css?family=Abel|Caveat|Bevan&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/css/navbar.css"/>
            <link rel="stylesheet" type="text/css" href="/css/home.css"/>
            <link rel="stylesheet" type="text/css" href="/css/register.css"/>

        </head>
        <body>
            <header>
              <Navbar/>
            </header>

            <div className="main_wrapper" >
                <div className="cards_wrapper" >

                    <form enctype="multipart/form-data" action="/register/" method="POST">
                        <p>Username</p><input name="username"></input>
                        <p>Password</p><input name="password"></input>
                        <p>Profile Image</p><input type="hidden" name="public_id"></input>
                        <input type="file" name="myFile" className="custom-file-input"/>
                        <input type="submit" name="submit" className="submitButton"/>
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

module.exports = ShowRegisterForm;
