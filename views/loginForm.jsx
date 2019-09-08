var React = require("react");
var Navbar = require('./components/navbar.jsx');

class Login extends React.Component {
  render() {

    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css?family=Abel|Caveat|Bevan&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/css/navbar.css"/>
            <link rel="stylesheet" type="text/css" href="/css/home.css"/>
            <link rel="stylesheet" type="text/css" href="/css/login.css"/>
        </head>
        <body>
            <header>
              <Navbar/>
            </header>

            <div className="main_wrapper" >
                <div className="cards_wrapper" >
                    <form action="/login/" method="POST">
                        <p>Username</p><input type="text" name="username"></input>
                        <p>Password</p><input type="password" name="password"></input>

                        <p><input type="submit" name="submit" className="submitButton"/></p>
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

module.exports = Login;
