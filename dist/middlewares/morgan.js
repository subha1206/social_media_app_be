"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const morgan = require('morgan');
const winstonLogger = require('../services/logger');
// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream = {
    // Use the http severity
    write: (message) => winstonLogger.http(message),
};
// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => {
    const env = process.env.NODE_ENV || 'development';
    return env !== 'development';
};
// Build the morgan middleware
const morganMiddleware = morgan(
// Define message format string (this is the default one).
// The message format is made from tokens, and each token is
// defined inside the Morgan library.
// You can create your custom token to show what do you want from a request.
process.env.NODE_ENV === 'development' ? 'dev' : 'combined', 
// Options: in this case, I overwrote the stream and the skip logic.
// See the methods above.
{ stream, skip });
module.exports = morganMiddleware;