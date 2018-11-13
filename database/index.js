const mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/fetcher');

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {

  var repoSchema = mongoose.Schema({
    // TODO: your schema here!
    repoName: String,
    userName: String,
    url: String,
    forks: Number
  });

  var Repo = mongoose.model('Repo', repoSchema);

});


let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;