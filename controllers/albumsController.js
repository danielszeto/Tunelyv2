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
function editAlbum (req, res) {
  Album.findById(req.params.id, function (error, album) {
    if (error) { res.json({ messsage: "Couldn't find album: " + error }); }
    res.render('partials/album-form', { album: album });
  });
}

// UPDATE
// PUT /album/:id
function updateAlbum (req, res) {
  Album.findById(req.params.id, function (error, album) {
    if (error) { res.json({ message: 'Could not find quote b/c:' + error }); }
    if (req.body.name) { album.name = req.body.name; }
    if (req.body.artist) { album.artist = req.body.artist; }
    if (req.body.release_date) { album.release_date = req.body.release_date; }
    if (req.body.genre) { album.genre = req.body.genre; }
    if (req.body.image) { album.image = req.body.image; }
    album.save(function (error) {
      if (error) { res.json({ messsage: 'Could not update album b/c:' + error }); }
      Album.find({}, function (error, quotes) {
        if (error) { res.json({ messsage: 'Error finding album: ' + error }); }
        res.redirect('/albums');
      });
    });
  });
}

// DELETE /albums/:id
function removeAlbum (req, res) {
  Album.findByIdAndRemove(req.params.id, function (error, album) {
    if (error) {
      res.json({ message: 'Could not delete quote b/c:' + error });
    } else {
      console.log('this quote deleted: ', album);
      res.redirect('/albums');
    }
  });
}



module.exports = {
  getAll: getAll,
  newAlbum: newAlbum,
  createAlbum: createAlbum,
  getAlbum: getAlbum,
  editAlbum: editAlbum,
  updateAlbum: updateAlbum,
  removeAlbum: removeAlbum
};
