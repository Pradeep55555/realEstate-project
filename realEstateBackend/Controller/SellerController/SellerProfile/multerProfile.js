
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, ('./assets'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // e.g., '.jpg'
        const uniqueName = Date.now().toString(36) + Math.random().toString(36).substring(2, 6) + ext;
        cb(null, uniqueName); // e.g., 'lsk9pz3a.jpg'
    }
});

const uploadProfile = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = uploadProfile;
