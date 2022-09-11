"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const http = require('http');
require('dotenv').config();
const logger = require('./services/logger');
const app = require('./app');
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        server.listen(PORT, () => {
            logger.info(`Listening on port ${PORT}...`);
        });
    });
}
startServer();
process.on('unhandledRejection', (err) => {
    logger.warn('UNHANDLED REJECTION! 💥 Shutting down...');
    logger.warn(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on('SIGTERM', () => {
    logger.warn('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
