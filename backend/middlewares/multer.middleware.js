const multer = require("multer");

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, file.originalname + "-" + Date.now());
  },
});

const upload = multer({ storage });

module.exports = { upload };
