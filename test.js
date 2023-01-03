
const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.path)
  console.log(req.url.slice(1))
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

server.listen(8091);