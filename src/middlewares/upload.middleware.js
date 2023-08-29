const multer = require("multer")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")

cloudinary.config({
  cloud_name: "dxs0yxeyr",
  api_key: "236157336681252",
  api_secret: "V2uHsegpJtBpFlUl3WSwkxdCL0I"
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "/demo/dry",
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => {
      const filename = new Date().getTime().toString()
      return filename
    }
  }
})

const limits = {
  fileSize: 20 * 1024 * 1024
}

const fileFilter = (request, file, cb) => {
  if (file.mimetype !== "image/jpeg") {
    return cb(Error("fileformat_error"))
  }
  cb(null, true)
}

const upload = multer({ storage, limits, fileFilter })

const uploadMiddleware = (field) => {
  const uploadField = upload.single(field)
  return (request, response, next) => {
    uploadField(request, response, (err) => {
      if (err) {
        if (err.message === "fileformat_error") {
          return response.status(400).json({
            succes: false,
            message: "File format invalid!"
          })
        }
        console.log(err)
        return response.status(400).json({
          succes: false,
          message: "File too large!"
        })
      }
      return next()
    })
  }
}
module.exports = uploadMiddleware
