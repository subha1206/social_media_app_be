
import express,{ Express, Request, Response }  from 'express';
import status from 'http-status';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

const xss = require('xss-clean');

const morgan = require('./middlewares/morgan');

const api = require('./routes/api');

const app:Express = express();

app.use(cors());

// Set security HTTP headers
app.use(helmet());

app.use(morgan);

app.use(express.json());

app.use(xss());

app.use(compression());

app.use('/api/v1', api);

// this is to catch all the routes other than predefined server routes
app.all('*', (req: Request, res: Response) => {
  res.status(status.NOT_FOUND)
    .json({ message: `${req.originalUrl} not found in server` });
});


module.exports = app;
