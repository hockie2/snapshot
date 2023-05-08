const sha256 = require('js-sha256');
const SALT = "TwEeDr";

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'hockie2',
  api_key: '757461425463161',
  api_secret: 'V1dqzuhEsEagfWGBfk4BxARKu2I'
});

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let showRegisterForm = (request, response) => {
    // let currentSessionCookie = request.cookies['loggedin'];
    // if (currentSessionCookie === undefined || currentSessionCookie === sha256('logged_out' + SALT )) {
        response.render('register');
    // }
    // else {
    //     response.redirect('/dreamhome');
    // }
  };
//////////////////////////////////////////////////////////////////////////////
  let register = (request, response) => {
    // check if username exist in the table

        var username = request.body.username;
        var password = sha256(request.body.password);

        db.accounts.checkUser(username, (err, callback) => {
            if (err) {
                // console.error("Error checking user: ", err.message);
                response.send("Error checking user");
            }

            //console.log(callback);
            if (callback) {
                response.send("You already registered. Please login.");

            } else {

                 // console.log(request.file)
                cloudinary.uploader.upload(request.file.path, function(error, result) {
                    var public_id = result.public_id;

                        db.accounts.createUser(username, password, public_id, (err, callback) => {

                            if (err) {
                                console.error("Error registering: ", err);
                                response.sendStatus(500);

                            } else {
                                //response.send("Register - Successful");
                                // console.log(callback)
                                let user_id = callback[0].id;
                                let currentSessionCookie = sha256( user_id + 'logged_id' + SALT );

                                // let data ={
                                //     username:callback[0].username,
                                //     profile_pic:callback[0].public_id
                                // }

                                response.cookie('loggedin', currentSessionCookie);
                                response.cookie("username", callback[0].username);
                                response.redirect('/');
                            }
                        })  // end of register db
                })
            }
        })  // end of check user
  };
//////////////////////////////////////////////////////////////////////////////
let loginForm = (request, response) => {
        response.render('loginForm');
    }
//////////////////////////////////////////////////////////////////////////////
let login = (request, response) => {
        let username = request.body.username;
        let password = sha256(request.body.password);

    db.accounts.checkUser(username, (error, callback) => {
        // query syntax error
        if (error) {
            console.error("Error getting user: ", error.message);
            //response.sendStatus(400);
            response.send("Error getting user");
        }
        if (callback) {
            db.accounts.login(username, password, (error, callback) => {
                if (error || callback===null) {
                    // console.error("Error getting user: ", error.message);
                    //response.sendStatus(400);
                    response.send("Error getting user");
                }

                // console.log(callback)
                let user_id = callback[0].id;
                let currentSessionCookie = sha256( user_id + 'logged_id' + SALT )
                if (callback) {

                    // let data ={
                    //     username:callback[0].username,
                    //     profile_pic:callback[0].public_id
                    // }

                    response.cookie('loggedin', currentSessionCookie);
                    response.cookie('username', callback[0].username);
                    response.redirect('/');
                }
                else {
                    response.redirect('/?err=login');
                }
            });
        }
        else {
            response.send("Error getting user");
        }
    })
}
//////////////////////////////////////////////////////////////////////////////
let logout = (request, response) => {
    // console.log(request.cookies.loggedIn);
    response.clearCookie("loggedin");
    response.clearCookie("username");
    response.redirect('/');
};






  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {

    showRegisterForm: showRegisterForm,
    register:register,

    loginForm:loginForm,
    login:login,
    logout:logout

  };

}
