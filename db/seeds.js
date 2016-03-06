var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/tunelyv2');
var Album = require("../models/album");
var Song = require("../models/song");

//clears all database entries.
Album.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
});

 var albums = [
  {name: "Thunderstruck", artist: "ACDC", release_date: "1990", genre: "Rock", image: "https://upload.wikimedia.org/wikipedia/en/e/e4/ACDC-Thunderstruck.png", songs: []},
  {name: "Kind of Blue", artist: "Miles Davis", release_date: "1959", genre: "Blues", image: "https://upload.wikimedia.org/wikipedia/en/9/9c/MilesDavisKindofBlue.jpg", songs: []},
  {name: "Hotel California", artist: "Eagles", release_date: "1976", genre: "Rock", image: "https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg", songs:[]},
  {name: "Straight Outta Compton", artist: "NWA", release_date: "1988", genre: "Rap", image: "http://assets.rollingstone.com/assets/images/album_review/31dcf51a0255f0f97c3db7e4b05726b7b37b14cf.jpg", songs:[]}
];


var sampleSongs = [];

sampleSongs.push({ name: 'Swamped',
                   trackNumber: 1
});
sampleSongs.push({ name: "Heaven's a Lie",
                   trackNumber: 2
});
sampleSongs.push({ name: 'Daylight Dancer',
                   trackNumber: 3
});
sampleSongs.push({ name: 'Humane',
                   trackNumber: 4
});
sampleSongs.push({ name: 'Self Deception',
                   trackNumber: 5
});
sampleSongs.push({ name: 'Aeon',
                   trackNumber: 6
});
sampleSongs.push({ name: 'Tight Rope',
                   trackNumber: 7
});


for (var i = 0; i < albums.length; i++) {
  var a = albums[i];
  for (var j = 0; j < sampleSongs.length; j++) {
    var s = sampleSongs[j];
    a.songs.push(s);
  }
}

Album.create(albums, function(err, docs) {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("Created:", docs);
    mongoose.connection.close();
  }
});