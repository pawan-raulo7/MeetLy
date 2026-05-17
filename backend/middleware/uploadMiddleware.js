const multer = require("multer");

// Used memory storage to avoid saving files to disk if we only need to read them once
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "text/plain") {
        cb(null, true);
    } else {
        cb(new Error("Only .txt files are allowed!"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB file size limit
    },
});

module.exports = upload;