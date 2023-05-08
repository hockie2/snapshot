/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======             CONFIGURATION          =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */



const pg = require('pg');
const url = require('url');

var configs;

if( process.env.DATABASE_URL ){

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

}else{
  configs = {
    user: 'hockie2',
    host: '127.0.0.1',
    port: 5432,
    database: 'snapshot_development'
  };
}


const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});


///////////////////////////////////////////////////////////////

const jsonfile = require('jsonfile');
const file = "data.json";


const express = require('express');
const app = express();


// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');


const methodOverride = require('method-override')
app.use(methodOverride('_method'));




const cookieParser = require('cookie-parser')
app.use(cookieParser());





/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======        REQUIRE MODEL FILES         =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */


const allHomeModelsFunction = require('./models/home');
const homeModelsObject = allHomeModelsFunction( pool );

const allAccountModelsFunction = require('./models/accounts');
const accountsModelsObject = allAccountModelsFunction( pool );



/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======          MODULE EXPORTS            =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */


module.exports = {
  //make queries directly from here
  queryInterface: (text, params, callback) => {
    return pool.query(text, params, callback);
  },

  // get a reference to end the connection pool at server end
  pool:pool,

  /*
   * ADD APP MODELS HERE
   */

   home: homeModelsObject,
  accounts: accountsModelsObject
};
