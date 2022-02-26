const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinaryUpload = require('../modules/cloudinary-config-arakan.js');

// POSTs a new image to the DB
router.post('/', rejectUnauthenticated, cloudinaryUpload.single('image'), async (req, res) => {
  console.log('req.file:', req.file);
  const imageUrl = req.file.path;
  const sqlText = `
    INSERT INTO "arakan_deaths"
    ("url", "user_id")
    VALUES
    ($1, $2);
  `;
  const sqlValues = [imageURL, req.user.id];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log('/arakan POST error:', dbErr);
      res.sendStatus(500);
    });
});

router.get('/deaths', rejectUnauthenticated, (req, res) =>{
  const sqlText = `
    SELECT "death_count" FROM "arakan_deaths"
  `;
  const sqlValues = '';
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      res.sendStatus(500);
    });
});

module.exports = router;