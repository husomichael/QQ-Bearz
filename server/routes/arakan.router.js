const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinaryUpload = require('../modules/cloudinary-config-arakan.js');

// POSTs a new image to cloudinary and then the DB
router.post('/', rejectUnauthenticated, cloudinaryUpload.single('image'), async (req, res) => {
  console.log('req.file:', req.file);
  const imageUrl = req.file.path;
  const sqlText = `
    INSERT INTO "arakan_deaths"
    ("url", "user_id")
    VALUES
    ($1, $2);
  `;
  const sqlValues = [imageUrl, req.user.id];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log('/arakan POST error:', dbErr);
      res.sendStatus(500);
    });
});

router.get('/', rejectUnauthenticated, (req, res) =>{
  const sqlText = `
    SELECT * FROM "arakan_deaths"
  `;
  // const sqlValues = '';
  pool.query(sqlText, [])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log(dbErr);
      res.sendStatus(500);
    });
});

router.put('/deaths', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    UPDATE "arakan_death_count"
    SET "death_count" = $1
    WHERE "id" = $2;
  `;
  const deaths = req.body.deaths
  const sqlValues = [deaths, 1];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log(dbErr);
      res.sendStatus(500);
    });
});

router.get('/deaths', rejectUnauthenticated, (req, res) =>{
  const sqlText = `
    SELECT * FROM "arakan_death_count"
    WHERE "id" = $1;
  `;
  pool.query(sqlText, [1])
    .then((dbRes) => {
      res.send(dbRes.rows[0]);
    })
    .catch((dbErr) => {
      console.log(dbErr);
      res.sendStatus(500);
    });
});

module.exports = router;