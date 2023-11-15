// Basic Lib Import
require('dotenv').config();
const express = require('express');
// Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const routes = require('./src/routes');
const { connectWithDB } = require('./src/config/mongo');
const { handleError } = require('./src/utility/errors.js');

const app = new express();

// Security Middleware Implement
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use('/images', express.static(path.join(__dirname, '/src/uploads')));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

// CORS CONFIGURATIONS

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://v2admin.onnow.io',
  'https://app.onnow.io',
  'https://staging-admin.onnow.io',
  'http://localhost:3004',
  'http://localhost:3005',
  '*',
];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    return callback(null, true);
    // if (process.env.NODE_ENV !== 'production') {
    //   return callback(null, true);
    // } else {
    //   // if (whitelist.includes(origin) || whitelist.includes('*')) {
    //   // return callback(null, true);
    //   // } else {
    //   //   callback(new Error('Not allowed by CORS'));
    //   // }
    // }
  },
};

app.use(cors(corsOptions));

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// Mongo DB Database Connection
connectWithDB();

// Routing Implement
app.use('/api/v1', routes);
app.use('/health-check', (req, res) => res.status(200).json('Working'));
app.use(handleError);

// Undefined Route Implement
app.use('*', (req, res) => {
  res.status(404).json({ status: 'fail', data: 'Just for the 2nd test' });
});

module.exports = app;
