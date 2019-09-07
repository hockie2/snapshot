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
        const username = request.cookies.ownername;
        const photoID = request.params.id;

        db.home.getPhotoID(photoID,(error, callback) => {
            // console.log(callback);

            db.home.getPhotoIDcomments(photoID,(error, callbackComments) => {

                let data ={
                    photos:callback[0],
                    comments:callbackComments,

                }
                response.render('photoID',data);

                })

            })
  };
//////////////////////////////////////////////////////////////////////////////

let addPhotoForm = (request, response) => {
        // console.log('HEYYYYYYYYYYYYYYYYYYYYYYYY')
        response.render('addPhotoForm');
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
    photographer:photographer,

    deletePhoto:deletePhoto,
    editPhoto:editPhoto





  };

}
