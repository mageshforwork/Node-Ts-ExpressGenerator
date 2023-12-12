import { Express } from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      console.log('k');
      
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({ storage }).any();

// export default { upload } as const;
