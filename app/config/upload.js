const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/uploads/'); // Direktori penyimpanan file yang diunggah
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // Ambil ekstensi file asli
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Nama file yang diunggah
  },
});

const fileFilter = function (req, file, cb) {
  const allowedFileTypes = /jpeg|jpg|png/; // Jenis file yang diizinkan (jpeg, jpg, png)
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true); // Jika tipe file sesuai, lanjutkan pengunggahan
  } else {
    cb('Error: File harus berupa gambar (jpeg, jpg, png).', false); // Jika tipe file tidak sesuai, tolak pengunggahan
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;