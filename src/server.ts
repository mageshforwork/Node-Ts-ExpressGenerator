/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import mongoose, { Connection, ConnectOptions } from 'mongoose';
// import { ConnectOptions } from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import { exit } from 'node:process';
import formData from 'express-form-data';

import 'express-async-errors';

import BaseRouter from '@src/routes/api';
import Paths from '@src/constants/Paths';

import EnvVars from '@src/constants/EnvVars';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import { NodeEnvs } from '@src/constants/misc';
import { RouteError } from '@src/other/classes';

import Tokener from "@src/routes/middleware/SuperAuthMiddleware";
import uploadFile from "@src/routes/middleware/UploadsMiddleware";


// **** Variables **** //

const app = express();


// **** Setup **** //

// Basic middleware
app.use(express.json());
// app.use(formData.parse());
// app.use(uploadFile);
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

console.log("URI >> ");

// Connect to MongoDB
mongoose.connect(EnvVars.MongodbUri.toString(), {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
const db: Connection = mongoose.connection;

db.on('error', (error) => {
  console.log('Database connection error : ',error);
  exit(0);
});

db.once('open', () => {
  console.log('Connected to the database');
});

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});

// ** API Token Provider ** //

// app.use('/api/admin', Tokener.authTokener);


// ** Front-End Content ** //

// Set views directory (html)
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Nav to users pg by default
app.get('/', (_: Request, res: Response) => {
  return res.redirect('/users');
});

// Redirect to login if not logged in.
app.get('/users', (_: Request, res: Response) => {
  return res.sendFile('users.html', { root: viewsDir });
});


// **** Export default **** //

export default app;
