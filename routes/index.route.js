const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const uploadCloudinary = require("../config/cloudinary");
const File = require("../model/fileModel");
const authentication = require("../middlewere/auth");

router.get("/", authentication, async (req, res) => {
  // console.log(req.user);
  const userFiles = await File.find({
    user: req.user.userId,
  });
  res.render("Home", { userFiles });
});
router.post(
  "/upload-file",
  authentication,
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      res.status(401).render("error", {
        status: 401,
        message: "Select you file First",
      });
    }
    const image = req.file?.path;
    const cloudinaryImage = await uploadCloudinary(image);
    if (!cloudinaryImage) {
      return res.status(400).json({
        error: error,
        message: "Unable To Upload The Image",
      });
    }

    const file = await File.create({
      path: cloudinaryImage.url,
      originalname: cloudinaryImage.original_filename,
      user: req.user.userId,
    });

    if (!file) {
      return res.status(400).json({
        message: "Unable to store In Db",
      });
    }

    // return res.status(200).json({
    //   user: file,
    //   message: "Image successfully uploaded over Cloudinary",
    // });
    return res.status(401).render("error", {
      status: 401,
      message: "Uploaded Sucessfully",
    });
  },
);
router.get("/download/:id", authentication, async (req, res) => {
  try {
    const fileid = req.params.id;
    const file = await File.findOne({
      _id: fileid,
      user: req.user.userId,
    });
    if (!file) {
      return res.status(400).json({
        message: "Unauthorised",
      });
    }
    return res.redirect(file.path);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
