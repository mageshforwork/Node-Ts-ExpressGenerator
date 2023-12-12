import * as e from 'express';

import { Request as ExpressRequest } from 'express';

import { ISessionUser } from '@src/models/User';


// **** Express **** //

export interface IReq<T = any> extends ExpressRequest  {
  body: T;
  // files?: T;
  admin?: T;
  adminId?: T;
  files?: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[];
}

export interface IRes extends e.Response {
  locals: {
    sessionUser?: ISessionUser;
  };
}
