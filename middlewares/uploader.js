const multer = require("multer");

const multerFiltering = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("File format is not valid"), false);
  }
};

const storage = multer.memoryStorage(); 
const uploads = multer({
  storage: storage,
  fileFilter: multerFiltering,
});

module.exports = uploads;
