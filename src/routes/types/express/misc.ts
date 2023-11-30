import * as e from 'express';

import { ISessionUser } from '@src/models/User';


// **** Express **** //

export interface IReq<T = unknown> extends e.Request {
  body: T;
  files?: T;
  admin?: T;
  adminId?: T;
}

export interface IRes extends e.Response {
  locals: {
    sessionUser?: ISessionUser;
  };
}
