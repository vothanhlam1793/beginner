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
var detect = require('detect-file-type');
router.post('/upload', function(req, res) {
    let sampleFile;
    let uploadPath;
    console.log(req.body)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    var dateName = (new Date()).getTime();
    // Tìm chuẩn của file
    detect.fromBuffer(sampleFile.data, function(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        // Đổi lại tên file theo thời gian - tránh trùng lắp
        fileName = dateName + "." + result.ext;
        uploadPath = __dirname + '/../public/images/' + fileName;

        // Lưu file xuống dữ liệu
        sampleFile.mv(uploadPath, function(err) {
            if (err)
            return res.status(500).send(err);
            res.send({
                link: "/images/" + fileName
            });
        });
    });
});

module.exports = router;
