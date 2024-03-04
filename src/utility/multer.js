const multer = require('multer');
const path = require('path');
const fs = require('fs');

const brandStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/brands'));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      req.body.brandName.replace(/Img|\+/g, '') +
        path.extname(file.originalname)
    );
  },
});



const brandUpload = multer({ storage: brandStorage });


module.exports = {
  brandUpload,

};
