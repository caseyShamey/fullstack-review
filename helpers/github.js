const request = require('request');
const config = require('../config.js');

var getReposByUsername = (userName, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API



  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  var options = {
    url: `https://api.github.com/users/${userName}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  var callback = function(error, response, body) {
    if (error) {
      cb(error);
    } else {
      var info = JSON.parse(body);
      cb(null, info);
    }
  }

  request(options, callback);
}

module.exports.getReposByUsername = getReposByUsername;