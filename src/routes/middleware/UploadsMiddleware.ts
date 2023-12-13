import multer from "multer";
import HSC from '@src/constants/HttpStatusCodes';
import Service from '@src/services/Service';
import { FileFilterCallback as Callback } from "multer";
import { Express, Request, Response, NextFunction } from "express";

let File: Express.Multer.File;
const MIMES = ['image/png', 'image/jpg', 'image/jpeg'];
const FIELDS = ['profile'];
let file_filter_error = false;

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (request: Request, file: Express.Multer.File, callback: Callback) => {
  if (MIMES.includes(file.mimetype) && FIELDS.includes(file.fieldname)) callback(null, true);
  else {
    file_filter_error = true;
    console.log("mimetype/fieldname are unsupported.");
    callback(null, false);
  }
};

const AnyUpload = multer({ storage, fileFilter,  limits: { fileSize: 1024 * 1024 * 2, files: 1 } });

const uploadFile = (request: Request, response: Response, next: NextFunction) => {
  AnyUpload.any()(request, response, (err) => {
    if (file_filter_error) {
      return Service.ResponseError(response, 'Mimetype or fieldname are unsupported.', HSC.UNSUPPORTED_MEDIA_TYPE);
    } else if (err instanceof multer.MulterError) {
      // if (err.code === 'LIMIT_FILE_SIZE') {
      //   return Service.ResponseError(response, 'File size is too large.', HSC.PAYLOAD_TOO_LARGE);
      // }
      // if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      //   return Service.ResponseError(response, 'Too many files.', HSC.PAYLOAD_TOO_LARGE);
      // }
      return Service.ResponseError(response, err.message, HSC.PAYLOAD_TOO_LARGE);
    } else if (err) {
      return Service.ResponseError(response, 'Internal/Uploading Error : ' + err, HSC.INTERNAL_SERVER_ERROR);
    }
    next();
  });
};

export default uploadFile;
export const upload_none = multer();
