const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {


});


var repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoName: String,
  userName: String,
  url: {type: String, unique: true},
  forks: Number
});

var Repo = mongoose.model('Repo', repoSchema);

Repo.on('index', function(err) {
  if(err) {
    console.error(err);
  }
})

let save = (repos, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var errors = [];
  repos.forEach(repo => {
    Repo.create({
      repoName: repo.name,
      userName: repo.owner.login,
      url: repo.html_url,
      forks: repo.forks
    }, function(err, repo) {
      if (err) {
        errors.push(err);
      }
    });
  })
  if (errors.length > 0) {
    callback(errors)
  } else {
    callback(null, 'Done!')
  }
}

module.exports.save = save;