import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import User from '@src/models/User';
import UserRoutes from './UserRoutes';
import SuperAuthRoutes from './handler/SuperAuthHandler';
import Tokener from './middleware/SuperAuthMiddleware';
// import { upload } from "./middleware/UploadsMiddleware";
import uploadFile, { upload_none } from "@src/routes/middleware/UploadsMiddleware";

// **** Variables **** //

const apiRouter = Router(), validate = jetValidator();

// ** Add Router ** //

const UserRouter = Router();
const SuperRouter = Router();

// ** Add APIs ** //

// UserRouter.get(Paths.Users.Get, UserRoutes.getAll); // Get all users
// UserRouter.post(Paths.Users.Add, validate(['user', User.isUser]), UserRoutes.add); // Add one user
// UserRouter.put(Paths.Users.Update, validate(['user', User.isUser]), UserRoutes.update); // Update one user
// UserRouter.delete(Paths.Users.Delete, validate(['id', 'number', 'params']), UserRoutes.delete); // Delete one user

SuperRouter.get(Paths.Auth.Get, SuperAuthRoutes.getAll); // Get all admins
SuperRouter.get(Paths.Auth.GetOne, SuperAuthRoutes.getOne); // Get one admin
SuperRouter.post(Paths.Auth.Login, upload_none.none(), SuperAuthRoutes.logIn); // One admin login
SuperRouter.post(Paths.Auth.Register, uploadFile, SuperAuthRoutes.add); // Register one admin
SuperRouter.post(Paths.Auth.Login, SuperAuthRoutes.logOut); // One admin logout
SuperRouter.put(Paths.Auth.Update, SuperAuthRoutes.update); // Update one admin
SuperRouter.delete(Paths.Auth.Delete, SuperAuthRoutes.delete); // Delete one admin

// ** Set Routers ** //

apiRouter.use(Paths.Users.Base, UserRouter); // Add UserRouter
apiRouter.use(Paths.Auth.Base, SuperRouter); // Add SuperAdminRouter

// Project API

// End - Project API

// **** Export default **** //

export default apiRouter;
