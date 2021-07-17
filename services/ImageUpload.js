const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: 'Y+h2aRoVzS7kA2IdWw2W/xHoKiAf86CQjpDQVNgi',
    accessKeyId: 'AKIATTJKTAQO2ZRR23C6',
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
};

const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'irenehl-bucket',
        metadata(req, file, cb) {
            cb(null, { fieldName: 'TESTING_METADATA' });
        },
        key(req, file, cb) {
            cb(null, `${Date.now().toString()}-${file.originalname}`);
        },
    }),
});

module.exports = upload;
