const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-east-2',
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetypr === 'image/png' || file.mimetypr === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Invalid Mime Type, only JPEG, JPG or PNG'), false);
    }
};

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket: 'project-turnos',
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, `${req.nombreArchivo}-${Date.now().toString()}`);
        },
    }),
});

module.exports = upload;
