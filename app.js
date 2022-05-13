var http = require('http'),
    fs = require('fs');
const path = require('path');

var htmlFile;
var cssFile;
var cssFile1;
var jsFile;
var listFile = []

fs.readFile('./index.html', function(err, html) {
    if (err) {
        throw err;
    }
    htmlFile = html;
});

fs.readFile('./style.css', function(err, css) {
    if (err) {
        throw err;
    }
    cssFile = css;
});

fs.readFile('./variables.css', function(err, css) {
    if (err) {
        throw err;
    }
    cssFile1 = css;
})
fs.readFile('./script.js', function(err, js) {
    if (err) {
        throw err;
    }
    jsFile = js;
})

const directoryPath = path.join(__dirname, 'Image');

fs.readdir(directoryPath, function(err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function(file) {
        fs.readFile(`./Image/${file}`, function(err, data) {
            if (err) {
                throw err;
            }
            listFile.push({
                key: file,
                value: data
            });
        });

    });
});

var server = http.createServer(function(request, response) {
    if (request.url.endsWith('png') || request.url.endsWith('jpg')) {
        response.writeHead(200);
        const a = listFile.find(i => request.url === `/Image/${i.key}`)
        response.write(a.value);
    } else {
        switch (request.url) {
            case "/style.css":
                response.writeHead(200, { "Content-Type": "text/css" });
                response.write(cssFile);
                break;
            case "/variables.css":
                response.writeHead(200, { "Content-Type": "text/css" });
                response.write(cssFile1);
                break;
            case "/script.js":
                response.writeHead(200, { "Content-Type": "script/javascript" });
                response.write(jsFile);
                break;
            default:
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(htmlFile);
        }
    }

    response.end();
});


server.listen(8000);