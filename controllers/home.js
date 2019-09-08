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

  let indexControllerCallback = (request, response) => {
    let username = request.cookies.username;
        // let password = sha256(request.body.password);

    if(username){
      db.home.userProfilePic(username,(error, callback) => {
        // console.log(callback[0])
        let data ={
            profile_pic:callback[0].public_id,
            username: username
        }
        response.render('home',data);
      });
    }
    else{
        response.render('home');
    }
  };


/////////////////////////////////////////////////////////////////////////////////////
  let gallery = (request, response) => {

        db.home.getPhotos(request,(error, callback) => {
            // console.log(callback);
        let data ={
            photos:callback
        }
        response.render('gallery',data);

        })

  };
/////////////////////////////////////////////////////////////////////////////////////
  let dashboard = (request, response) => {

    let username = request.cookies.username;

        db.home.getDashPhotos(username,(error, callback) => {
            // console.log(callback);
        let data ={
            photos:callback,
            username:username
        }
        response.render('dashboard',data);

        })

  };

/////////////////////////////////////////////////////////////////////////////////////
  let photoID = (request, response) => {
        const username = request.cookies.username;
        const photoID = request.params.id;

    db.accounts.checkUser(username,(error, callbackUser) => {
        // console.log(callbackUser[0].id)

        db.home.getPhotoID(photoID,(error, callback) => {
            // console.log(callback);

            db.home.getPhotoIDcomments(photoID,(error, callbackComments) => {

                let data ={
                    userProfilePic:callbackUser[0].public_id,
                    photos:callback[0],
                    comments:callbackComments,
                    photoID:photoID

                }
                response.render('photoID',data);

                })

            })
    })
  };
//////////////////////////////////////////////////////////////////////////////

let addPhotoForm = (request, response) => {
        // console.log('HEYYYYYYYYYYYYYYYYYYYYYYYY')
    const username = request.cookies.username;

    db.accounts.checkUser(username, (error, callbackHome) => {
            // console.log(callbackHome[0].id)

        if (error) {
            console.error("Error posting photo: ", error.message);
            response.send("Query error for posting");

        }
        else {
            // console.log(callbackHome[0].id)
            let data={
                user_id:callbackHome[0].id
            }
            response.render('addPhotoForm',data);
        }

    })
}

//////////////////////////////////////////////////////////////////////////////
let addPhoto = (request, response) => {

    const user_id = request.body.user_id;

    const caption = request.body.caption;
    const camera = request.body.camera;
    const aperture = request.body.aperture;
    const shutter = request.body.shutter;
    const iso = request.body.iso;

    cloudinary.uploader.upload(request.file.path, function(error, result) {
    var public_id = result.public_id;

        db.home.addPhoto(public_id,caption,camera,aperture,shutter,iso,user_id, (error, callbackHome) => {
            if (error) {
                console.error("Error posting photo: ", error.message);
                response.send("Query error for posting");
            } else {
                response.redirect("/gallery")
            }
        })
    })
}
/////////////////////////////////////////////////////////////////////////////////////
  let photographer = (request, response) => {

    let username = request.params.username;

        db.home.getPhotographer(username,(error, callback) => {
            // console.log(callback);
        let data ={
            photos:callback,
            username:username
        }
        response.render('photographer',data);

        })

  };
//////////////////////////////////////////////////////////////////////////////
let deletePhoto = (request, response) => {

    const username = request.cookies.username;
    const photoID = request.params.id;

    db.home.delPhoto(photoID, (error, callback) => {
        if (error) {
                console.error("Error deleting post");
                response.send("Query error for deleting");

            } else {
                //response.send("Tweed - Successful")
                response.redirect("/dashboard")
            }
    })
}
//////////////////////////////////////////////////////////////////////////////
let editPhoto = (request, response) => {

    const ownername = request.cookies.ownername;
    const photoID = request.params.id;

    db.home.editPhoto(photoID, (error, callback) => {
        if (error) {
                console.error("Error editing post");
                response.send("Query error for editing");

            } else {

                // console.log(callback[0])

                let data = {
                    photos:callback[0]
                }

                response.render("editPhoto",data)
            }
    })
}

//////////////////////////////////////////////////////////////////////////////
let updatePhoto = (request, response) => {

    const photoID = request.params.id;

    const caption = request.body.caption;
    const camera = request.body.camera;
    const aperture = request.body.aperture;
    const shutter = request.body.shutter;
    const iso = request.body.iso;

    db.home.updatePhoto(caption,camera,aperture,shutter,iso,photoID, (error, callback) => {
        if (error) {
                console.error("Error updating post");
                response.send("Query error for updating");

            } else {

                response.redirect("/gallery/"+photoID)
            }
    })
}
//////////////////////////////////////////////////////////////////////////////
let postComment = (request, response) => {

    const username = request.cookies.username;
    const photoID = request.params.id;
    const comment = request.body.comment_textarea;

    // console.log(comment);

    db.home.postComment(photoID,username,comment, (error, callback) => {
        if (error) {
            console.error("Error posting comment");
            response.send("Error posting comment");
        }
        else {
            //response.send("Tweed - Successful")
            response.redirect("/gallery/"+`${photoID}`)
            // response.render("myHomePage")
        }
    })
}







  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    home: indexControllerCallback,
    gallery: gallery,
    dashboard:dashboard,
    photoID:photoID,
    addPhotoForm:addPhotoForm,
    addPhoto:addPhoto,

    photographer:photographer,

    deletePhoto:deletePhoto,
    editPhoto:editPhoto,
    updatePhoto:updatePhoto,

    postComment:postComment





  };

}
