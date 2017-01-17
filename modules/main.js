var express = require('express');
var fs = require('fs');
var newobj = {
  "table": []
};

var fileExists = function (callback) {

  fs.exists('./data/myjsonfile.json', function (exists) {
    if (exists) {
      fs.readFile('./data/myjsonfile.json', 'utf8', function (err, data) {
        if (err) {
          console.log('error getting json data');
          return;
        }
        var results = JSON.parse(data);
        results = results.table;
        callback(results);
      });
    } else {

      callback(false);
    }
  });

};


var createjson = function (callback) {

  var obj = {
    "firstname": "firstname",
    "lastname": "lastname"
  };

  newobj.table.push(obj);

  var save = JSON.stringify(newobj);
  fs.writeFile('./data/myjsonfile.json', save, function () {
    console.log('file saved successfully');
    callback()
  });



};

module.exports.fileExists = fileExists;
module.exports.createjson = createjson;