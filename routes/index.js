var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Image Creta' });
});

router.get("/upload", function(req, res){
    res.render("image/index");
});

var Image = require("../app/models/index").images;
router.post('/upload', function(req, res) {
    let sampleFile;
    let uploadPath;
    console.log(req.body)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/images/' + sampleFile.name;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
        if (err)
        return res.status(500).send(err);
        res.send({
            link: "/images/" + sampleFile.name
        });
        // var i = new Image({
        //     name: sampleFile.name,
        //     description: req.body.description || "None",
        //     type: req.body.type || "None",
        //     info: req.body.info || {},
        //     title: req.body.title || "None",
        //     link: "/images/" + sampleFile.name
        // });
        // i.save(i).then(data=>{
        //     res.send(data);
        // })
    });
});

module.exports = router;
