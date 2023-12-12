import { Express, Request } from "express";
import multer, { FileFilterCallback as Callback } from "multer";

let File: Express.Multer.File;
const MIMES = ['image/png', 'image/jpg', 'image/jpeg'];
const FIELDS = ['profile'];

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: Callback) => {
  if (MIMES.includes(file.mimetype) && FIELDS.includes(file.fieldname)) callback(null, true);
  else {
    console.log("mimetype/fieldname are unsupported.",file);
    callback(null, false);
  }
};

// export default { upload } as const;
export const upload = multer({ storage, fileFilter});
