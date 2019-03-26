/* eslint no-unused-vars: 0 */
const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const cors       = require('cors');

const serverConfig  = require('./config');

const routers = require('./controllers/routesController');
const { GroupRoutes, PersonRoutes, MessageRoutes } = routers;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors())
app.use('/group', GroupRoutes);
app.use('/member', PersonRoutes);
app.use('/message', MessageRoutes);
app.use(bodyParser.json({ limit: '20mb' }));
app.use(express.static(path.join(__dirname, '../dist/client')));


// Connect Database
mongoose.Promise = global.Promise;
mongoose.connect(serverConfig.mongoURL, { useNewUrlParser: true })
  .then(() => console.log('Database is connected'))
  .catch((err) => console.error("ERROR: " + err));

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Oh! Internal server error !');
});

// Render file html when get router '/'
app.get('/', (req, res) => {
  res.status(404).end();
});

// Connect Server
app.listen(port, (err) => {
  if (!err) {
    console.log(`Yeah! Server is listening to port ${port}!`);
  } else {
    console.log('Oh! There is a problem with Server!');
  }
});

module.exports = app;
