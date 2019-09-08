
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
                    SELECT comments.comment,users.public_id FROM comments
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

    const username_query = `SELECT id FROM users WHERE username='${username}' `;

    dbPoolInstance.query(username_query,(error, queryResult_id) => {
        let user_id = queryResult_id.rows[0].id

        // console.log(queryResult_id.rows[0].id)
    const query = `INSERT INTO comments(comment,belongs_to_photo,comment_by_user) VALUES($1,$2,$3)`;
    let values = [comment,photoID,user_id];
    dbPoolInstance.query(query,values,(error, queryResult) => {

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
})
}


























/////////////////////////////////////////////////////////////////////////////////////

let showHome = (ownername, callback) => {
    const query = `SELECT * FROM homes`;

    dbPoolInstance.query(query, (error, queryResult) => {

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

// SELECT cost FROM costs INNER JOIN owners ON costs.owner = owners.id WHERE owners.ownername = '${ownername}'

/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
let showMyHome = (ownername, callback) => {
    const query = `
                    SELECT homes.id,location,cost
                    FROM homes
                    INNER JOIN owners
                    ON homes.owner = owners.id
                    WHERE owners.ownername = '${ownername}'`;
        dbPoolInstance.query(query, (error, queryResult) => {
            // console.log(queryResult.rows)
            callback(error, queryResult.rows);
        })
}
/////////////////////////////////////////////////////////////////////////////////////
let addHomeForm = (ownername, callback) => {
    const query = `SELECT id FROM owners WHERE owners.ownername = '${ownername}'`;

        dbPoolInstance.query(query, (error, queryResult) => {
            // console.log(queryResult.rows)

            callback(error, queryResult.rows);
        })
}
/////////////////////////////////////////////////////////////////////////////////////
let addHomePost = (ownername,location,cost,url, callback) => {

    const id_query = `SELECT id FROM owners WHERE owners.ownername = '${ownername}'`;

    dbPoolInstance.query(id_query ,(error, queryResult) => {

        let owner_id = queryResult.rows[0].id;

        // create entry into home table
        const query = `INSERT INTO homes(location,cost,owner) VALUES ($1,$2,$3) RETURNING id`;
        let values = [location, cost, owner_id];

            dbPoolInstance.query(query, values,(error, queryResult2) => {
                // console.log(queryResult.rows)
                if( error ){
                // invoke callback function with results after query has executed
                callback(error, null);
              }
              else{
                let homeId = queryResult2.rows[0].id;
                // callback1(error, queryResult2.rows);
                // console.log("saved home!")
                // console.log(homeId)
                // console.log(url)
                let counter = 0;
                // loop through image array, for each url, do an insert into images table
                for (var i = 0; i < url.length; i++) {

                    let image_query = `INSERT INTO images(url,home,owner) VALUES ($1,$2,$3)`;
                    let values2 = [url[i],homeId,owner_id];

                    dbPoolInstance.query(image_query, values2,(error, queryResult) => {
                        // console.log(queryResult.rows)
                        if (error) {
                            console.log(error)
                        } else {
                            // console.log("image saved" + i);
                            counter++;
                        }
                    });
                    if (counter === 3){
                            callback(null, true);
                    }
                };
              }
            })
            callback(error, queryResult.rows);
        })

}

/////////////////////////////////////////////////////////////////////////////////////
let myHomeComments = (postId,callback) => {

    const id_query = `
                    SELECT comments.comment,comments.by_owner,owners.ownername,owners.profile_pic
                    FROM comments INNER JOIN owners ON owners.id = comments.by_owner
                    INNER JOIN homes ON homes.id = comments.onhome
                    WHERE homes.id = '${postId}'`;

    dbPoolInstance.query(id_query ,(error, queryResult) => {

            // console.log(queryResult);

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
let editHomePost = (postId, callback) => {

    const id_query = `
                    SELECT homes.id,location,cost,url
                    FROM homes
                    INNER JOIN images
                    ON homes.id = images.home
                    WHERE homes.id = '${postId}'`;

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
let getDeleteHomePost = (postId, callback) => {

    const id_query = `DELETE FROM homes WHERE id = $1 RETURNING id`;
    let values = [postId]

    dbPoolInstance.query(id_query, values,(error, queryResult) => {

        if( error ){
                // invoke callback function with results after query has executed
                console.log('ERROR!!!')
                callback(error, null);
              }
        else{

        // delete entry into home table
        const query = `DELETE FROM images WHERE home = $1 RETURNING id`;
        let values = [postId];

            dbPoolInstance.query(query, values,(error, queryResult2) => {
                console.log("In DELETE")
                if( error ){
                    console.log('ERROR!!!')
                // invoke callback function with results after query has executed
                callback(error, null);
              }
                callback(error, queryResult2.rows);
            })
        }
    })
}
/////////////////////////////////////////////////////////////////////////////////////
let deleteHomePost = (postId, callback) => {

    const id_query = `DELETE FROM homes WHERE id = $1 RETURNING id`;
    let values = [postId]

    dbPoolInstance.query(id_query, values,(error, queryResult) => {

        if( error ){
                // invoke callback function with results after query has executed
                console.log('ERROR!!!')
                callback(error, null);
              }
        else{

        // delete entry into home table
        const query = `DELETE FROM images WHERE home = $1 RETURNING id`;
        let values = [postId];

            dbPoolInstance.query(query, values,(error, queryResult2) => {
                console.log("In DELETE")
                if( error ){
                    console.log('ERROR!!!')
                // invoke callback function with results after query has executed
                callback(error, null);
              }
                callback(error, queryResult2.rows);
            })
        }
    })
}
/////////////////////////////////////////////////////////////////////////////////////
let contractorsAll = (postId, callback) => {

    const query = `SELECT * FROM contractors`;

    dbPoolInstance.query(query,(error, queryResult) => {

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
let contractorInfo = (postId, callback) => {

    const query = `SELECT * FROM contractors WHERE id='${postId}'`;

    dbPoolInstance.query(query,(error, queryResult) => {

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





    // showImages,
    // showMyHome,
    // showMyImages,

    // addHomeForm,
    // addHomePost,

    // myHomePost,

    // editHomePost,
    // updateHomePost,
    // getDeleteHomePost,
    // deleteHomePost,

    // myHomeComments,
    // postComment,

    // contractorsAll,
    // contractorInfo,
  };
};
