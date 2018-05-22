const express = require('express')
const bodyParser = require('body-parser')
const { resolve } = require('path')
const app = express()
const PORT = 9001

module.exports = app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(resolve(__dirname, '..', 'public'))) // Serve static files from ../public
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html'))) // Send index.html for any other requests.

if (module === require.main) {
  // Start listening only if we're the main module.
  //When a file is run directly from Node.js, require.main is set to its module
  app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
}
