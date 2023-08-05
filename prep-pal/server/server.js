const express = require('express');
const cors_anywhere = require('cors-anywhere');
const app = express();
const port = 5000;

const proxy = cors_anywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeaders: [], // Do not require any headers.
  removeHeaders: [] // Do not remove any headers.
});

app.use('/proxy', (req, res) => {
  req.url = req.url.replace('/proxy/', '/');
  proxy.emit('request', req, res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
