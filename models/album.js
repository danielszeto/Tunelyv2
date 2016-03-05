var mongoose = require('mongoose');

var AlbumSchema = mongoose.Schema({
  name: String,
  artist: String,
  release_date: String,
  genre: String,
  image: String,

  created_at: Date,
  updated_at: Date
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;