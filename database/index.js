const mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/fetcher');

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {

  var repoSchema = mongoose.Schema({
    // TODO: your schema here!
    repoName: String,
    userName: String,
    url: {type: String, unique: true},
    forks: Number
  });

  var Repo = mongoose.model('Repo', repoSchema);

  Event.on('index', function(err) {
    if(err) {
      console.error(err);
    }
  })

});


let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repos.forEach(repo => {
    Repo.create({
      repoName: repo.name,
      userName: repo.owner.login,
      url: repo.html_url,
      forks: repo.forks
    }, function(err, repo) {
      if (err) {
        return console.error(err);
      } else {
        console.log(repo);
      }
    });
  })
}

module.exports.save = save;