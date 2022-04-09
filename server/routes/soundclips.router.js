const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinaryUpload = require('../modules/cloudinary-config');

// POSTs a new soundclip to cloudinary and then the DB, then posts related tags to the tags table.
router.post('/', rejectUnauthenticated, cloudinaryUpload.single('soundclip'), async (req, res) => {
  console.log('req.file:', req.file);
  const soundclipUrl = req.file.path;
  const soundclipTitle = req.body.title;
  const tagsArray = req.body.tags.split(',');
  console.log('tagsArray:', tagsArray);
  console.log('soundclipTitle:', soundclipTitle);
  const sqlText = `
    INSERT INTO "soundclips"
    ("user_id", "title", "url", "username")
    VALUES
    ($1, $2, $3, $4)
    RETURNING "id";
  `;
  const sqlValues = [req.user.id, soundclipTitle, soundclipUrl, req.user.username];
  pool.query(sqlText, sqlValues)
    .then((dbRes) =>{
      let sqlText2 = `
            INSERT INTO "tags"
            ("user_id", "soundclip_id", "username", "tag")
            VALUES 
      `;
      let sqlValues2 = [
        req.user.id, // $1
        dbRes.rows[0].id, // $2
        req.user.username, // $3
      ];
      for (let i = 0; i < tagsArray.length; i++) {
        sqlText2 += `($1, $2, $3, $${i + 4})`;
        sqlValues2.push(tagsArray[i]);
        // If its the last ingredient being entered, add semicolon to end SQL query,
        // Otherwise add ', ' before concatenating next values
        if (i === tagsArray.length - 1) {
          sqlText2 += ';';
        } else {
          sqlText2 += ', ';
        };
      };
      console.log('sqlText2:', sqlText2);
      console.log('sqlValues2:', sqlValues2);
      pool.query(sqlText2, sqlValues2)
      .then((dbRes) =>{
        res.sendStatus(200);
      })
      .catch((dbErr) =>{
        console.log('/soundclips POST tags nested error:', dbErr);
        res.sendStatus(500);
      })
    })
    .catch((dbErr) => {
      console.log('/soundclips POST error:', dbErr);
      res.sendStatus(500);
    });
});

router.get('/', rejectUnauthenticated, (req, res) => {
  const sqlText =  `
    SELECT * FROM "soundclips";
  `;
  pool.query(sqlText, [])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log('/soundclips GET err:', dbErr);
      res.sendStatus(500);
    });
});

router.get('/tags', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT * FROM "tags";
  `;
  pool.query(sqlText, [])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log('/soundclips/tags GET err:', dbErr);
      res.sendStatus(500);
    })
});

module.exports = router;