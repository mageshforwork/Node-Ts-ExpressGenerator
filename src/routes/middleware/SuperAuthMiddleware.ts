import HSC from '@src/constants/HttpStatusCodes';
import EnvVars from '@src/constants/EnvVars';
import { JwtPayload, verify } from 'jsonwebtoken';
import Service from '@src/services/Service';
import { NextFunction } from 'express';
import { IReq, IRes } from '../types/express/misc';
import mongoose from 'mongoose';
import { devNull } from 'node:os';


// *** Function *** //

async function authTokener(request: IReq, response: IRes, next: NextFunction) {
    try {
        if (request.method === 'OPTIONS') {
            return next()
        }
        if (!request.header('Authorization')) {
            return Service.ResponseError(response, 'Authorization token required', HSC.UNAUTHORIZED);
        }
        const token = request.header('Authorization')!.replace("Bearer ", "");
        const decoded: JwtPayload = verify(token, EnvVars.JwtSecret as string, { audience: EnvVars.ApiUrl as string }) as JwtPayload;
        if (!decoded.admin) {
            return Service.ResponseError(response, 'Invalid token for admin', HSC.UNAUTHORIZED);
        }
        const exist = await mongoose.model('Admin').exists({_id: decoded.sub}).catch((err) => {
            return Service.ResponseError(response, 'Maybe admin removed or : ' + err, HSC.UNAUTHORIZED);
        });
        if (!exist) {
            return Service.ResponseError(response, 'Admin removed.', HSC.UNAUTHORIZED);
        }
        request.admin = decoded.admin
        request.adminId = decoded.sub
    } catch (err) {
        return Service.ResponseError(response, ('Invalid token'), HSC.UNAUTHORIZED);
    }
    next();
}

// **** Export default **** //

export default { authTokener } as const;