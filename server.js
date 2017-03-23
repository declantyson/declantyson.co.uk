/*
 *
 *  declantyson/2017
 *  Declan Tyson
 *  v0.0.1
 *  23/03/2017
 *
 */

const package = require('./package.json'),
      http = require('http'),
      pug = require('pug'),
      fs = require('fs'),
      express = require('express'),
      app = express();

app.set('view engine', 'pug');

app.use("/css", express.static('css'));
app.use("/data", express.static('data'));
app.use("/scripts", express.static('scripts'));

const getScripts = () => {
    let dirContents = fs.readdirSync('scripts'),
        files = [];
    for(let i = 0; i < dirContents.length; i++) {
        let file = dirContents[i],
            stat = fs.statSync(`scripts/${file}`);

        if(!stat.isDirectory()) files.push(`/scripts/${file}`);
    }

    return files;
};

app.get('/', function(req,res) {
    res.render('index', {
        'package': package,
        'scripts': getScripts()
    });
});

app.get('/:template', function(req,res) {
    res.render(req.params.template, {
        'package': package,
        'scripts': getScripts()
    });
});

http.createServer(app).listen(1234);

console.log("App running on 1234");