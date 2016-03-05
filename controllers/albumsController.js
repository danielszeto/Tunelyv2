var Album = require('../models/album');

function getAll (req, res) {
  Album.find({}, function (error, albums) {
    console.log('found these albums: ', albums);
    if (error) {
      res.json({ message: 'Could not find any albums' });
    }
    console.log('about to render these albums: ', albums);
    res.render('layout', { albums: albums.reverse() });  // reverse() => newest albums first
  });
}

// NEW
// GET /albums/new
function newAlbum (req, res) {
  res.render('partials/album-form', { album: null });
}

// CREATE
// POST /quotes
function createAlbum (req, res) {
  var album = new Album(req.body);
  album.save(function (error) {
    if (error) { res.json({ messsage: 'Could not ceate album b/c:' + error }); }
    Album.find({}, function (error, albums) {
      if (error) { res.json({ messsage: 'Error finding album: ' + error }); }
      res.redirect('/albums');
    });
  });
}

// SHOW
// GET /quotes/:id
function getAlbum (req, res) {
  Album.findById(req.params.id, function (error, album) {
    console.log(req.params.id);
    if (error) { res.json({ message: 'Could not find album b/c:' + error }); }
    res.render('partials/album-show', { album: album });
  });
}

// EDIT
// GET /quotes/:id/edit
// function editAlbum (req, res) {
//   Album.findById(req.params.id, function (error, album) {
//     if (error) { res.json({ messsage: "Couldn't find album: " + error }); }
//     res.render('partials/quote-form', { album: album });
//   });
// }


module.exports = {
  getAll: getAll,
  newAlbum: newAlbum,
  createAlbum: createAlbum,
  getAlbum: getAlbum,
  // editAlbum: editAlbum,
  // updateQuote: updateQuote,
  // removeQuote: removeQuote
};
