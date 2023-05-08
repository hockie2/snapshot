
const SALT = "TwEeDr";

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

/////////////////////////////////////////////////////////////////////////////////////
let userProfilePic = (username, callback) => {

    const query = `SELECT public_id FROM users WHERE users.username = '${username}'`;

    dbPoolInstance.query(query ,(error, queryResult) => {
        // console.log(queryResult.rows)

            if( error ){
                // invoke callback function with results after query has executed
                callback(error, null);
            }
            else{
                callback(error, queryResult.rows);
            }
    })
}
/////////////////////////////////////////////////////////////////////////////////////
let getPhotos = (request, callback) => {
    const query = `SELECT * FROM photos ORDER BY id DESC`;

    dbPoolInstance.query(query, (error, queryResult) => {
    // console.log(queryResult)
     if( error ){
        // invoke callback function with results after query has executed
        callback(error, null);
      }
      else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
            // console.log(queryResult.rows)
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
  })
}

/////////////////////////////////////////////////////////////////////////////////////
let getDashPhotos = (username, callback) => {
    const query = `
                    SELECT photos.id,photos.public_id,caption,camera,aperture,shutter,iso
                    FROM photos
                    INNER JOIN users
                    ON photos.belongs_to_user = users.id
                    WHERE users.username = '${username}' ORDER BY id DESC`;

    dbPoolInstance.query(query, (error, queryResult) => {
    // console.log(queryResult.rows)
     if( error ){
        // invoke callback function with results after query has executed
        callback(error, null);
      }
      else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
  })
}
/////////////////////////////////////////////////////////////////////////////////////
let getPhotoID = (photoID, callback) => {

    const id_query = `
                    SELECT users.public_id AS user_public_id,username,photos.id,photos.public_id,caption,camera,aperture,shutter,iso
                    FROM photos INNER JOIN users ON users.id = photos.belongs_to_user
                    WHERE photos.id = '${photoID}'`;

    dbPoolInstance.query(id_query ,(error, queryResult) => {

            if( error ){
                // invoke callback function with results after query has executed
                callback(error, null);
            }
            else{
                callback(error, queryResult.rows);
            }
})
}
/////////////////////////////////////////////////////////////////////////////////////
let getPhotoIDcomments = (photoID, callback) => {

    const id_query = `
                    SELECT comments.comment,users.public_id, users.username FROM comments
                    INNER JOIN users ON users.id = comments.comment_by_user
                    INNER JOIN photos ON photos.id = comments.belongs_to_photo
                    WHERE comments.belongs_to_photo = '${photoID}'`;

    dbPoolInstance.query(id_query ,(error, queryResult) => {

            if( error ){
                // invoke callback function with results after query has executed
                callback(error, null);
            }
            else{
                callback(error, queryResult.rows);
            }
})
}

/////////////////////////////////////////////////////////////////////////////////////
let getPhotographer = (username, callback) => {

    const username_query = `SELECT users.public_id AS user_public_id, username, photos.id, photos.public_id, caption, camera, aperture, shutter,iso FROM photos
                            INNER JOIN users ON photos.belongs_to_user = users.id
                             WHERE username='${username}'`;

    dbPoolInstance.query(username_query,(error, queryResult) => {

        // console.log(queryResult.rows)
        if( error ){
            // invoke callback function with results after query has executed
            console.log('ERROR!!!')
            callback(error, null);
              }
        else{
            callback(error, queryResult.rows);
        }

})
}
/////////////////////////////////////////////////////////////////////////////////////
let delPhoto = (photoID, callback) => {

    const id_query = `DELETE FROM photos WHERE id = $1 RETURNING id`;
    let values = [photoID]

    dbPoolInstance.query(id_query, values,(error, queryResult) => {

        if( error ){
                // invoke callback function with results after query has executed
                console.log('ERROR!!!')
                callback(error, null);
              }
        else{
                // console.log("In DELETE")
                callback(error, queryResult.rows);
        }
    })
}

/////////////////////////////////////////////////////////////////////////////////////
let editPhoto = (photoID, callback) => {

    const id_query = `
                    SELECT users.public_id AS user_public_id, username, photos.id, photos.public_id, caption, camera, aperture, shutter, iso
                    FROM photos
                    INNER JOIN users
                    ON users.id = photos.belongs_to_user
                    WHERE photos.id = '${photoID}'`;

    dbPoolInstance.query(id_query ,(error, queryResult) => {

            if( error ){
                // invoke callback function with results after query has executed
                callback(error, null);
            }
            else{
                callback(error, queryResult.rows);
            }
})
}
/////////////////////////////////////////////////////////////////////////////////////
let updatePhoto = (caption,camera,aperture,shutter,iso,photoID, callback) => {

    // console.log(url)

    const query = `UPDATE photos SET caption=$1, camera=$2, aperture=$3, shutter=$4, iso=$5 WHERE id = $6 RETURNING id`;
    let values = [caption,camera,aperture,shutter,iso,photoID]

    dbPoolInstance.query(query, values,(error, queryResult) => {

        if( error ){
            // invoke callback function with results after query has executed
            console.log('ERROR!!!')
            callback(error, null);
        }
        else{
            callback(error, queryResult.rows);
        }
    })
}
/////////////////////////////////////////////////////////////////////////////////////
let addPhoto = (public_id,caption,camera,aperture,shutter,iso,user_id, callback) => {

    const query = `INSERT INTO photos(public_id,caption, camera, aperture, shutter, iso, belongs_to_user) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
    let values = [public_id,caption,camera,aperture,shutter,iso,user_id]

    dbPoolInstance.query(query, values,(error, queryResult) => {

        console.log('HEEEEEEEEEEEEEEE')
        // console.log(queryResult)
        if( error ){
            // invoke callback function with results after query has executed
            console.log('ERROR!!!')
            callback(error, null);
        }
         else {
            if (queryResult.rows.length > 0) {
                callback(null, queryResult.rows);
            } else {
                callback(null, null);
            }
        }
    })



}
/////////////////////////////////////////////////////////////////////////////////////
let postComment = (photoID,username,comment, callback) => {

    // console.log(photoID,username,comment)
    const username_query = `SELECT id FROM users WHERE username='${username}' `;

    dbPoolInstance.query(username_query,(error, queryResult_id) => {
        let user_id = queryResult_id.rows[0].id

        // console.log(queryResult_id.rows[0].id)
    const query = `INSERT INTO comments(comment,belongs_to_photo,comment_by_user) VALUES($1,$2,$3) RETURNING *`;
    let values = [comment,photoID,user_id];
    dbPoolInstance.query(query,values,(error, queryResult) => {

        // console.log(queryResult)
        if( error ){
            // invoke callback function with results after query has executed
            console.log('ERROR!!!')
            callback(error, null);
              }
        else{
            callback(error, queryResult.rows);
        }
    })
})
}
/////////////////////////////////////////////////////////////////////////////////////
// let getAllComments = (request, callback) => {

//     const query = `SELECT * FROM comments`;
//     dbPoolInstance.query(query,values,(error, queryResult) => {

//         // console.log(queryResult.rows)
//         if( error ){
//             // invoke callback function with results after query has executed
//             console.log('ERROR!!!')
//             callback(error, null);
//               }
//         else{
//             callback(error, queryResult.rows);
//         }
//     })

// }




  return {
    userProfilePic,
    getPhotos,
    getDashPhotos,
    getPhotoID,
    getPhotoIDcomments,

    getPhotographer,
    addPhoto,
    delPhoto,
    editPhoto,
    updatePhoto,

    postComment




  };
};
