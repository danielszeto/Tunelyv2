var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var albumsController = require('../controllers/albumsController');

// ALBUMS API
router.route('/albums')
  .get(albumsController.getAll)
  .post(albumsController.createAlbum);
router.route('/albums/new')
  .get(albumsController.newAlbum);
router.route('/albums/:id')
  .get(albumsController.getAlbum)
  .put(albumsController.updateAlbum)
  .delete(albumsController.removeAlbum);
router.route('/albums/:id/edit')
  .get(albumsController.editAlbum);


module.exports = router;
