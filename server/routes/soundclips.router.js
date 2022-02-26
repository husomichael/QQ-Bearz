const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinaryUpload = require('../modules/cloudinary-config');

// POSTs a new image to the DB
router.post('/', cloudinaryUpload.single('soundclip'), async (req, res) => {
  console.log('req.file:', req.file);
  const soundclipUrl = req.file.path;
  // const sqlText = `
  // `;
  // const sqlValues = [req.user.id, req.file.path];
  // pool.query(sqlText, sqlValues)
  //   .then((dbRes) => {
  //   })
  //   .catch((dbErr) => {
  //     console.error('/uploads/:id POST error:', dbErr)
  //     res.sendStatus(500);
  //   });
});

module.exports = router;