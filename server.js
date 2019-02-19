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

// Use Routes
app.use('/api/jobs', jobs);

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
  