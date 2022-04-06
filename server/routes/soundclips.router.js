const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinaryUpload = require('../modules/cloudinary-config');

// POSTs a new soundclip to cloudinary and then the DB
router.post('/', rejectUnauthenticated, cloudinaryUpload.single('soundclip'), async (req, res) => {
  console.log('req.file:', req.file);
  const soundclipUrl = req.file.path;
  const soundclipTitle = req.body.title;
  const soundclipTags = req.body.tags;
  console.log('soundclipTitle:', soundclipTitle);
  const sqlText = `
    INSERT INTO "soundclips"
    ("user_id", "title", "tags", "url", "username")
    VALUES
    ($1, $2, $3, $4, $5);
  `;
  const sqlValues = [req.user.id, soundclipTitle, soundclipTags, soundclipUrl, req.user.username];
  pool.query(sqlText, sqlValues)
    .then((dbRes) =>{
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log('/soundclips POST error:', dbErr);
      res.sendStatus(500);
    });
});



module.exports = router;