var express = require('express');
var router = express.Router();
var fs = require('fs');
const FILE_PATH= '/tmp/upload.json';

/* GET users listing. */
router.route('/').get(function(req, res) {
  console.log('GET REQUEST');
  fs.readFile(FILE_PATH, 'utf8', function (err, data) {
    if (err) {
      res.status(400).send('Oooops ', err);
    }
    res.status(200).send(data);
  })
}).post(function (req,res) {
  console.log('POST REQUEST', req.body);
  const data = JSON.stringify(req.body, null, 2);
  fs.writeFile(FILE_PATH,data, (err) => {
    if (err) {
      res.status(400).send('Oooops ', err);
    }
    res.status(201).send("Created");
  })
});

module.exports = router;
