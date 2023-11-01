


const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (req, res) {
  const q = url.parse(req.url, true);
  const pathname = q.pathname;

  if (pathname.endsWith('.css')) {
    // Serve CSS files
    fs.readFile(`.${pathname}`, 'utf8', function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  } else {
    // Handle HTML files and other resources
    const filename = `.${pathname}`;
    fs.readFile(filename, function (err, data) {
      if (err) {
        if (err.code === 'ENOENT') {
          fs.readFile('./404.html', function (err404, data404) {
            if (err404) {
              res.writeHead(404, { 'Content-Type': 'text/html' });
              res.end('404 Not Found');
            } else {
              res.writeHead(404, { 'Content-Type': 'text/html' });
              res.write(data404);
              res.end();
            }
          });
        } else {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('Internal Server Error');
        }
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
}).listen(8080);

