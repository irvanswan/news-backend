const multer = require("multer");
const fs = require("fs");
const path = require("path");
const formResponse = require("./formResponse");

// Storage Poster
let storagePoster = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/poster");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
// Storage Avatar
let storageAvatar = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './public/uploads/avatar');
    },
    filename: function(req, file,cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
// Storage Poster categoryNew
let storageCategory = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, "./public/uploads/category_poster");
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
// Storage Background Porfile
let storageBackground = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "./public/uploads/bg_profile")
    },
    filename:(req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})
// Upload categoryPoster
let uploadCategoryPoster = multer({
    storage : storageCategory,
    limits:{
        fileSize : 5 * 1000 * 1000
    },
    fileFilter: function (req, file, inst){
        const ext = path.extname(file.originalname);
        ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg" && ext !==".PNG"
        ? inst(new Error("Only Images Allowed"), false)
        : inst(null, true);
    }
})
// Upload Poster
let uploadPoster = multer({
  storage : storagePoster,
  limits: {
    fileSize: 5 * 1000 * 1000,
  },
  fileFilter: function (req, file, inst) {
    const ext = path.extname(file.originalname);
    ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg" && ext !==".PNG"
      ? inst(new Error("Only images allowed"), false)
      : inst(null, true);
  },
});
// Upload Avatar
let uploadAvatar = multer({
    storage : storageAvatar,
    limits : {
        fileSize: 5 * 1000 * 1000,
    },
    fileFilter: function (req, file, inst) {
        const ext = path.extname(file.originalname);
        ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg"
          ? inst(new Error("Only images allowed"), false)
          : inst(null, true);
    },
})
//Upload background Profile
let uploadBackground = multer({
    storage : storageBackground,
    limits :{
        fileSize: 5 * 1000 * 1000,
    },
    fileFilter: function (req, file, inst) {
        const ext = path.extname(file.originalname);
        ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg"
          ? inst(new Error("Only images allowed"), false)
          : inst(null, true);
    },
})

//method form Upload
const formUpload = {
    uploadPoster : (req, res, next) =>{
        const uploadedPoster = uploadPoster.single(`poster`)
        uploadedPoster(req, res, (err)=>{
            if(err instanceof multer.MulterError){
                formResponse({
                   message : `Error Multer ${err.message}`,
                   status : 400
                }, res)
            }else if(err){
                formResponse({
                    message : `error ${err.message}`,
                    status : 400
                }, res)
            }else{
                next()
            }
        })
    },
    uploadAvatar : (req, res, next) => {
        const uploadedAvatar = uploadAvatar.single(`photo`)
        uploadedAvatar(req, res, (err)=>{
            if(err instanceof multer.MulterError){
                formResponse({
                   message : `Error Multer ${err.message}`,
                   status : 400
                }, res)
            }else if(err){
                formResponse({
                    message : `error ${err.message}`,
                    status : 400
                }, res)
            }else{
                next()
            }
        })
    },
    uploadCategoryPoster : (req, res, next)=>{
        const uploadedCategoryPoster = uploadCategoryPoster.single(`image`)
        uploadedCategoryPoster(req, res, (err)=>{
            if(err instanceof multer.MulterError){
                formResponse({
                    message : `Error Multer ${err.message}`,
                    status : 400
                }, res)
            }else if(err){
                formResponse({
                    message : `Error ${err.message}`,
                    status : 400
                }, res)
            }else{
                next()
            }
        })
    },
    uploadBackground : (req, res, next)=>{
        const uploadedBackgroundProfile = uploadBackground.single(`image`)
        uploadedBackgroundProfile(req, res, (err)=>{
            if(err instanceof multer.MulterError){
                formResponse({
                    message:`Error Multer ${err.message}`,
                    status : 400
                }, res)
            }else if(err){
                formResponse({
                    message : `Error ${err.message}`,
                    status : 400
                }, res)
            }else{
                next()
            }
        })
    }
}

module.exports = formUpload
