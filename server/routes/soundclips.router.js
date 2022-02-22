const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinaryUpload = require('../modules/cloudinary-config');

// POSTs a new image to the DB
router.post('/:id', rejectUnauthenticated, cloudinaryUpload.single('image'), async (req, res) => {
  console.log('req.file:', req.file)
  const imageUrl = req.file.path;
  const sqlText = `
    INSERT INTO "meeting_uploads"
      ("image_title", "image_url", "meeting_id", "user_id")
      VALUES
      ($1, $2, $3, $4)
      RETURNING "meeting_id";
  `;
  const sqlValues = ["Placeholder Title", imageUrl, req.params.id, req.user.id];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      const meetingId = { meeting_id: dbRes.rows[0].meeting_id };
      res.send(meetingId);
    })
    .catch((dbErr) => {
      console.error('/uploads/:id POST error:', dbErr)
      res.sendStatus(500);
    });
});