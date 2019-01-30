const express = require('express');
const ngrok = require('ngrok');
const path = require('path');

let endpoint = '';
const app = express();

console.log(`Dirname: ${path.join(__dirname + '/index.html')}`)

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html')); // serve static html
});

const server = app.listen(8088, () => {
  ngrok.connect(8088).then(ngrokUrl => {
    endpoint = ngrokUrl
    console.log(`Your dapp is being served!, open at ${endpoint} and scan the QR to login!`)
  })
})
