const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require("../config/keys");



aws.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    region: "sa-east-1"
});
 

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
}
 
const upload = multer({
  storage: multerS3({
    fileFilter,
    s3,
    bucket: 'physique-trainer-pro',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {

      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();

      today = mm + '-' + dd + '-' + yyyy;

      const newFileName = Date.now();
      const fullPath = 'client-photos/'+ req.user.id + '/' + today.toString() + '/' + newFileName;
      cb(null, fullPath);
    }
  })
});

const multipleUpload = multer({
  storage: multerS3({
    fileFilter,
    s3,
    bucket: 'physique-trainer-pro',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})
.array('file');




module.exports = {upload, multipleUpload};