const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinaryUpload = require('../modules/cloudinary-config');

// POSTs a new image to the DB
router.post('/', cloudinaryUpload.single('image'), async (req, res) => {
  console.log('req.file:', req.file);
  const imageUrl = req.file.path;
  const sqlText = `
    INSERT INTO "arakan_deaths"
  `
});

module.exports = router;