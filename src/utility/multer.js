// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const brandStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads/brands'));
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       req.body.brandName.replace(/Img|\+/g, '') +
//         path.extname(file.originalname)
//     );
//   },
// });

// const outletManagerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads/outlet-manager'));
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       req.body.name +
//         '-' +
//         file.fieldname.replace('Img', '') +
//         path.extname(file.originalname)
//     );
//   },
// });

// const brandManagerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads/brand-manager'));
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       req.body.name.replaceAll(' ', '-') +
//         '-' +
//         file.fieldname.replace('Img', '') +
//         path.extname(file.originalname)
//     );
//   },
// });

// const itemStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads/items'));
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.originalname.replace(' ', '-') + path.extname(file.originalname)
//     );
//   },
// });

// const customerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const customerFilePath = path.join(__dirname, '../uploads/customers');
//     fs.mkdirSync(customerFilePath, { recursive: true });
//     cb(null, customerFilePath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.userid + path.extname(file.originalname));
//   },
// });

// const brandUpload = multer({ storage: brandStorage });
// const outletManagerUpload = multer({ storage: outletManagerStorage });
// const brandManagerUpload = multer({ storage: brandManagerStorage });
// const itemImageUpload = multer({ storage: itemStorage });
// const customerUpload = multer({ storage: customerStorage });

// module.exports = {
//   brandUpload,
//   outletManagerUpload,
//   brandManagerUpload,
//   itemImageUpload,
//   customerUpload,
// };
