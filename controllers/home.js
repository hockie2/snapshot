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
            photos:callback
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

    db.home.addHomePost(request, (error, result) => {
        if (error) {
                console.error("Error getting add photo form ", error.message);
                response.send("Error getting add photo form");

            } else {
                response.send("HEYYY")
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
    addPhotoForm:addPhotoForm



    // postComment:postComment

  };

}
