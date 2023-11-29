import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import User from '@src/models/User';
import UserRoutes from './UserRoutes';
import SuperAdminRoutes from './routes/SuperAdminRoutes';

// **** Variables **** //

const apiRouter = Router(), validate = jetValidator();

// ** Add Router ** //

const UserRouter = Router();
const SuperRouter = Router();

// ** Add APIs ** //

UserRouter.get(Paths.Users.Get, UserRoutes.getAll); // Get all users
UserRouter.post(Paths.Users.Add, validate(['user', User.isUser]), UserRoutes.add); // Add one user
UserRouter.put(Paths.Users.Update, validate(['user', User.isUser]), UserRoutes.update); // Update one user
UserRouter.delete(Paths.Users.Delete, validate(['id', 'number', 'params']), UserRoutes.delete); // Delete one user

SuperRouter.get(Paths.Super_Admin.Get, SuperAdminRoutes.getAll); // Get all admins

// ** Set Routers ** //

apiRouter.use(Paths.Users.Base, UserRouter); // Add UserRouter
apiRouter.use(Paths.Super_Admin.Base, SuperRouter); // Add SuperAdminRouter

// Project API

// End - Project API

// **** Export default **** //

export default apiRouter;
