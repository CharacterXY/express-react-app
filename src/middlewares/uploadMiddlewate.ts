import multer from 'multer'
import path from 'path'

// Configuration for uploading files
const storage = multer.diskStorage({
  destination: '../public/images/bikes',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

// Validation for uploaded files
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: any,
) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/
  const extensionName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  )
  const mimeType = allowedTypes.test(file.mimetype)
  if (extensionName && mimeType) {
    return cb(null, true)
  }
  return cb('Images only!')
}

// Multer middleware
const upload = multer({
  storage,
  fileFilter,
})

export default upload
