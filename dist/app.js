"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const xss = require('xss-clean');
const morgan = require('./middlewares/morgan');
const api = require('./routes/api');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Set security HTTP headers
app.use((0, helmet_1.default)());
app.use(morgan);
app.use(express_1.default.json());
app.use(xss());
app.use((0, compression_1.default)());
app.use('/api/v1', api);
// this is to catch all the routes other than predefined server routes
app.all('*', (req, res) => {
    res.status(http_status_1.default.NOT_FOUND)
        .json({ message: `${req.originalUrl} not found in server` });
});
module.exports = app;
