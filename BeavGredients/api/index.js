const express = require('express');
const app = express();

// ... your routes and middleware ...

// Export the app for Vercel Serverless Functions
module.exports = app;