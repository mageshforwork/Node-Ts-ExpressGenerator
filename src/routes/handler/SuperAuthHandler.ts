// **** Imports **** //
import HSC from '@src/constants/HttpStatusCodes';
import Auth, { IAuth } from '@src/models/SuperAuth/_Auth';
import Database from '@src/models/SuperAuth/Database';
import { RouteError } from '@src/other/classes';
import Service from '@src/services/Service';
import EnvVars from '@src/constants/EnvVars';
import { IReq, IRes } from '../types/express/misc';
import { compareSync, hashSync } from "bcrypt";
import { sign } from 'jsonwebtoken';


// **** Variables **** //

export const Auth_NOT_EXIST = 'Admin not found';


// **** Functions **** //

/**
 * Get all admins.
 */
async function getAll(_: IReq, response: IRes) {
  try {
    const users = await Auth.find();
    return Service.ResponseSuccess(response, users, HSC.OK);
  } catch (err) {
    return Service.ResponseError(response, err, HSC.BAD_REQUEST);
  }
}

/**
 * Get one admin.
 */
async function getOne(request: IReq, response: IRes) {
  try {
    const { id } = request.params;
    const view = await Auth.findOne({_id: id}).select("name email");
    if (!view) {
      return Service.ResponseError(response, Auth_NOT_EXIST, HSC.NOT_FOUND);
    }
    return Service.ResponseSuccess(response, view, HSC.OK);
  } catch (err) {
    return Service.ResponseError(response, err, HSC.BAD_REQUEST);
  }
}

/**
 * Login one admin.
 */
async function logIn(request: IReq, response: IRes) {
  try {
    const body: IAuth = request.body as IAuth;
    const { email, password } = body;
    const exist = await Auth.findOne({email});
    if (!exist) {
      return Service.ResponseError(response, 'Email or password is wrong.', HSC.NOT_FOUND);
    }
    const compare = compareSync(password!, exist?.pwdHash);
    if (!compare) {
      return Service.ResponseError(response, 'Password is wrong.', HSC.NOT_FOUND);
    }
    const expiresIn = EnvVars.JwtExpiry;
    exist.pwdHash = '';
    const token = sign(
      {
        admin: exist,
      },
      EnvVars.JwtSecret as string,
      { expiresIn, subject: exist._id.toString(), audience: EnvVars.ApiUrl as string }
    );
    const adminRes = { token, expiresIn };
    return Service.ResponseSuccess(response, adminRes, HSC.OK);
  } catch (err) {
    return Service.ResponseError(response, err, HSC.BAD_REQUEST);
  }
}

/**
 * Register one admin.
 */
async function add(request: IReq, response: IRes) {
  console.log('request.admin : ',request.admin);
  console.log('request.adminId : ',request.adminId);
  try {
    const body: IAuth = request.body as IAuth;
    const { name, email, password } = body;
    const hash = hashSync(password!, 10);
    const data: IAuth = { name, email,
      pwdHash: hash
    };
    const auth = await Auth.create(data);
    const database = await Database.create({
      adminId: auth._id,
      dbName: auth.email!.split('@')[0]
    });
    return Service.ResponseSuccess(response, [], HSC.CREATED);
  } catch (err) {
    return Service.ResponseError(response, err, HSC.BAD_REQUEST);
  }
}

/**
 * Logout one admin.
 */
async function logOut(request: IReq, response: IRes) {
  try {
    // const body: IAuth = request.body as IAuth;
    // const { name, email, password } = body;
    // const hash = hashSync(password!, 10);
    // const data: IAuth = { name, email,
    //   pwdHash: hash
    // };
    // const auth = await Auth.create(data);
    return Service.ResponseSuccess(response, [], HSC.CREATED);
  } catch (err) {
    return Service.ResponseError(response, err, HSC.BAD_REQUEST);
  }
}

/**
 * Update one admin.
 */
async function update(request: IReq, response: IRes) {
  try {
    const { id } = request.params;
    const exist = await Auth.exists({_id: id});
    if (!exist) {
      return Service.ResponseError(response, Auth_NOT_EXIST, HSC.NOT_FOUND);
    }
    const body: IAuth = request.body as IAuth;
    const { name, email } = body;
    const data: IAuth = { name, email };
    await Auth.updateOne({_id: id}, {$set: data});
    return Service.ResponseSuccess(response, [], HSC.OK);
  } catch (err) {
    return Service.ResponseError(response, err, HSC.BAD_REQUEST);
  }
}

/**
 * Delete one admin.
 */
async function delete_(request: IReq, response: IRes) {
  try {
    const { id } = request.params;
    const exist = await Auth.exists({_id: id});
    if (!exist) {
      return Service.ResponseError(response, Auth_NOT_EXIST, HSC.NOT_FOUND);
    }
    await Auth.updateOne({_id: id}, {$set: {deleted_at: true}});
    return Service.ResponseSuccess(response, [], HSC.OK);
  } catch (err) {
    return Service.ResponseError(response, err, HSC.BAD_REQUEST);
  }
}

// **** Export default **** //

export default {
  getAll,
  getOne,
  logIn,
  add,
  logOut,
  update,
  delete: delete_,
} as const;