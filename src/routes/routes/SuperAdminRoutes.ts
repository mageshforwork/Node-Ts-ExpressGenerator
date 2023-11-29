// **** Imports **** //
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import Admin, { IAdmin } from '@src/models/SuperAdmin/Admin';
import { RouteError } from '@src/other/classes';
import Service from '@src/services/Service';
import { IReq, IRes } from '../types/express/misc';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all admins.
 */
async function getAll(_: IReq, response: IRes) {
  try {
    const users = await Admin.find();
    return response.status(HttpStatusCodes.OK).json({ status: true, message: 'success', data: users });
  } catch (e) {
    return response.status(HttpStatusCodes.BAD_REQUEST).json({ status: false, message: 'unsuccess', error: e });
  }
}

/**
 * Get one users.
 */
// async function getOne(_: IReq, res: IRes) {
//     const users = await Service.getAll();
//     return res.status(HttpStatusCodes.OK).json({ users });
//   }

/**
 * Add one user.
 */
// async function add(req: IReq<{admin: Admin}>, res: IRes) {
//   const { admin } = req.body;
//   await Service.addOne(admin);
//   return res.status(HttpStatusCodes.CREATED).end();
// }

/**
 * Update one user.
 */
// async function update(req: IReq<{admin: Admin}>, res: IRes) {
//   const { admin } = req.body;
//   await Service.updateOne(admin);
//   return res.status(HttpStatusCodes.OK).end();
// }

/**
 * Delete one user.
 */
// async function delete_(req: IReq, res: IRes) {
//   const id = +req.params.id;
//   await Service.delete(id);
//   return res.status(HttpStatusCodes.OK).end();
// }

// **** Export default **** //

export default {
  getAll,
  // getOne,
  // add,
  // update,
  // delete: delete_,
} as const;
