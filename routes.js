var multer = require('multer');
var upload = multer({ dest: './uploads/' });

module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const homeControllerCallbacks = require('./controllers/home')(allModels);
  const accountsControllerCallbacks = require('./controllers/accounts')(allModels);



  // app.get('/pokemons', pokemonControllerCallbacks.index);
  //app.get('/pokemons/:id', pokemons.getPokemon);

    app.get('/', homeControllerCallbacks.home);

    app.get('/register', accountsControllerCallbacks.showRegisterForm);
    app.post('/register', upload.single('myFile'), accountsControllerCallbacks.register);

    app.get('/login', accountsControllerCallbacks.loginForm);
    app.post('/login', accountsControllerCallbacks.login);
    app.get('/logout', accountsControllerCallbacks.logout);


    app.get('/gallery', homeControllerCallbacks.gallery);
    app.get('/gallery/:id', homeControllerCallbacks.photoID);
    app.get('/dashboard', homeControllerCallbacks.dashboard);


    app.get('/gallery/addphoto', homeControllerCallbacks.addPhotoForm);
    // app.post('/myhome/', homeControllerCallbacks.addHomePost);



    // app.post('/gallery/:id/', homeControllerCallbacks.postComment);



    // app.get('/myhome/:id/edit', homeControllerCallbacks.editHomePost);
    // app.put('/myhome/:id/', homeControllerCallbacks.updateHomePost);

    // app.get('/myhome/:id/delete', homeControllerCallbacks.getDeleteHomePost);
    // app.delete('/myhome/:id', homeControllerCallbacks.deleteHomePost);



    // app.get('/contractors', homeControllerCallbacks.contractors);
};
