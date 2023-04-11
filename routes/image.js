// Dependencies
const express = require('express');

// Model
const Image = require("../models/Image")

// Initialize Router functionality
const router = express.Router();

// Cloudinary Service
const uploadToCloudinary = require('../helper/cloudinary')

// Multer Middelware
const upload = require('../controllers/upload')

// POST - Upload Image
router.post("/image/upload", upload.any("image"), async (req, res) => {
    try {
        // Loop Through Selected Files - "req.files" is part of Multer Middleware when uploading multiple files, "req.file" is for a single file
        for (let i = 0; i < req.files.length; i++) {
            // Create Image
            const image = new Image()
            await image.save()

            // Upload Image to Cloudinary - "uploaded=images" is a folder I created on the Cloudinary website, you can make one and name it anything
            const data = await uploadToCloudinary(req.files[i].path, "uploaded-images");
            
            // Save imageUrl and publicId to MongoDB
            await Image.updateOne(
                {_id: image._id},
                {
                    $set: {
                        imageUrl: data.url,
                        publicId: data.public_id,
                    },
                }
            )
        }
        res.status(200).send("Image(s) Uploaded Successfully")
    }
    catch (err) {
        res.status(400).send(err)
    }
})

// Export to other files
module.exports = router;