const express = require('express');
const github = require('../helpers/github.js');
const bodyParser = require('body-parser');
const database = require('../database/index.js');
let app = express();
const path = require('path');

// app.get('/', function(req, res) {
//   res.sendFile(path.join)
// })


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//app.use(getReposByUsername());

app.post('/repos', function (req, res) {
  github.getReposByUsername(req.body.userName, (err, data) => {
    if (err) {
      res.status(404).send('Error!');
    } else {
      database.save(data, (err, result) => {
        if (err) {
          res.status(404).send('Error!')
        } else {
          res.send(result);
        }
      })
    }
  })

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  database.Repo.find({forks: {$gt: 0}}, (err, repos) => {
    if (err) {
      res.status(404).send('Error!')
    } else {
      var sorted = repos.sort(compareForks)
      var mostForked = sorted.slice(0, 25)
      res.send(mostForked)
    }
  })
});

var compareForks = (a, b) => {
  return b.forks - a.forks;
}


// let port = 1128;

// app.listen(port, function() {
//   console.log(`listening on port ${port}`);
// });

app.listenerCount(process.env.PORT || 1128, function(){
  console.log('You server is running');
})
