import multer from "multer";
import path from "path";
import fs from "fs";

// Upload directory
const baseDir = "uploads";
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

// Dynamic storage destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = baseDir;

    // If uploading user image
    if (file.fieldname === "userImage") {
      folder = path.join(baseDir, "user");
    }

    // If uploading product image
    if (file.fieldname === "productImage") {
      folder = path.join(baseDir, "product");
    }

    // Create folder if it doesn't exist
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueName + ext);
  }
});

// Allow only image file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;
  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

export const upload = multer({ storage, fileFilter });
