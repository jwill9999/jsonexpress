var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Person = require('../modules/Person.component').Person;
var fs = require('fs');
var fileExists = require('../modules/main').fileExists;
var createjson = require('../modules/main').createjson;



/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/form');
  
});

/* GET contacts page. */
router.get('/contact', function (req, res, next) {
  res.render('contact', {
    title: 'Contacts page'
  });
});


/* GET form and data page. */
router.get('/form', function (req, res, next) {
  fileExists(function (results) {
    if (results) {
      res.render('forms', {
        results: results,
        title: 'Form page'
      });
    }
    if (results === false) {
      console.log('no file returned creating trial database');
      createjson(function () {
        res.redirect('./form');
      });
    }


  });
});








/* post data to json file and save */
router.post('/form', function (req, res, next) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var person = new Person(firstname, lastname);






  fs.readFile('./data/myjsonfile.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    console.log(data);

    data = JSON.parse(data);
    data.table.push(person);
    var save = JSON.stringify(data);
    fs.writeFile('./data/myjsonfile.json', save);
    res.redirect('/form');

  });



});


module.exports = router;