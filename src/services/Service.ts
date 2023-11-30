import { IRes } from '../routes/types/express/misc';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

const ResponseSuccess = (response: IRes, data: any, status: HttpStatusCodes) => {
    return response.status(status).json({ status: true, message: 'success', data }).end();
}

const ResponseError = (response: IRes, e: any, status: HttpStatusCodes) => {
    return response.status(status).json({ status: false, message: 'unsuccess', error: e }).end();
}

export default {
    ResponseSuccess,
    ResponseError
} as const;