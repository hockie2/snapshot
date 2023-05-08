const sha256 = require('js-sha256');
const SALT = "TwEeDr";

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let getAll = (callback) => {

    let query = 'SELECT * FROM users';

    dbPoolInstance.query(query, (error, queryResult) => {
      if( error ){
        // invoke callback function with results after query has executed
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  };

/////////////////////////////////////////////////////////////////////////////////////
let checkUser = (username, callback) => {
        const query = `SELECT * FROM users WHERE username = $1`;
        let values = [username.toLowerCase()];

        dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {

                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {

                    callback(null, null);
                }
            }
        });
    }
/////////////////////////////////////////////////////////////////////////////////////
let createUser = (username,password,public_id,callback) => {

    const query = `INSERT INTO users (username, password, public_id) VALUES ($1, $2, $3) RETURNING *`;
    const values = [username.toLowerCase(), password, public_id];

     dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {
                    callback(null, null);
                }
            }
        })
}
/////////////////////////////////////////////////////////////////////////////////////
let login = (username,password, callback) => {

        const query = `SELECT * FROM users WHERE username = $1 AND password = $2`;
        const values = [username,password];

        dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {
                callback(error, null);
            }
            else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {
                    callback(null, null);
                }
            }
        });
    };
/////////////////////////////////////////////////////////////////////////////////////

  return {
    checkUser,
    createUser,

    login,



  };
};
