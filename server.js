const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const redis = require('redis');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;
const redisDb = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Setting up REDIS environment
let connectionString = require('./config/keys').redisURI;

if (connectionString === undefined) {  
  console.error("Please set the COMPOSE_REDIS_URL environment variable");
  process.exit(1);
}

let client = null;

if (connectionString.startsWith("rediss://")) {  
  client = redis.createClient(connectionString, {
    tls: { servername: new URL(connectionString).hostname }
  });
} else {
  client = redis.createClient(connectionString);
}

client.on('connect', () => {
  console.log('REDIS READY');
});

client.on('error', (e) => {
  console.log('REDIS ERROR', e);
 });

const jobs = require('./routes/api/jobs');
const skills = require('./routes/api/skills');

app.use((req, res, next) => {
  //to allow cross domain requests to send cookie information.
  res.header('Access-Control-Allow-Credentials', true);
  
  // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
  res.header('Access-Control-Allow-Origin',  req.headers.origin);
  
  // list of methods that are supported by the server
  res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
  
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
  
  next();
});

// Use Routes
app.use('/api/jobs', jobs);
app.use('/api/skills', skills);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
  