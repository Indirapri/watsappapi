var express = require("express");
var fs = require("fs");
var unzip = require("unzip2");
var app = express();

var multer = require("multer");
var multer_dest = multer({dest: "./tmp"}).single('zipFile');

app.post("/",multer_dest,function(req,res){
    console.log(req.file);      
    fs.createReadStream(req.file.path).pipe(unzip.Extract({path: './unziped'}));
    result = {
        file:req.file,
        message:"File has been extracted"
    };
    fs.unlink(req.file.path, function (e) {
        if (e) throw e;
        console.log('successfully deleted '+req.file.path);
    });
    res.end(JSON.stringify(result));
});

var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example App Listening at http://%s:%s",host,port);
})