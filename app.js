var http = require('http'),
    fs = require('fs');
const path = require('path');


// var htmlFile;
// var cssFile;
// var cssFile1;
// var jsFile;

// fs.readFile('./index.html', function(err, html) {
//     if (err) {
//         throw err;
//     }
//     htmlFile = html;
// });

// fs.readFile('./style.css', function(err, css) {
//     if (err) {
//         throw err;
//     }
//     cssFile = css;
// });

// fs.readFile('./variables.css', function(err, css) {
//     if (err) {
//         throw err;
//     }
//     cssFile1 = css;
// })
// fs.readFile('./script.js', function(err, js) {
//     if (err) {
//         throw err;
//     }
//     jsFile = js;
// })

const directoryPath = path.join(__dirname, 'Image');

var server = http.createServer(function(request, response) {
    if (request.url.endsWith('png') || request.url.endsWith('jpg')) {
        // console.log('request.url', request.url);
        fs.readFile(path.join(__dirname, request.url), function(err, data) {
            if (err) {
                response.writeHead(400);
                response.write('File not found');
            } else {
                response.writeHead(200);
                response.write(data);
            }
            response.end();
        });
    } else {
        switch (request.url) {
            case "../Css/style.css":
                response.writeHead(200, { "Content-Type": "text/css" });
                // response.write(cssFile); 
                break;
            case "../Css/variables.css":
                response.writeHead(200, { "Content-Type": "text/css" });
                // response.write(cssFile1);
                break;
            case "../JS/script.js":
                response.writeHead(200, { "Content-Type": "script/javascript" });
                // response.write(jsFile);
                break;
            case "../JS/login.js":
                response.writeHead(200, { "Content-Type": "script/javascript" });
                // response.write(jsFile);
                break;
            default:
                response.writeHead(200, { "Content-Type": "text/html" });
                // response.write(htmlFile);
        }
        response.end();
    }
});


server.listen(8000);
console.log("Server run on 8000");