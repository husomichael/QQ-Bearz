const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinaryUpload = require('../modules/cloudinary-config');

// POSTs a new soundclip to cloudinary and then the DB, then inserts related tags to the tags table.
router.post('/', rejectUnauthenticated, cloudinaryUpload.single('soundclip'), async (req, res) => {
  if(req.user.access > 1){
    const soundclipUrl = req.file.path;
    const soundclipTitle = req.body.title;
    const tagsArray = req.body.tags.split(',');
    console.log('tagsArray:', tagsArray);
    console.log('soundclipTitle:', soundclipTitle);
    const sqlText = `
      INSERT INTO "soundclips"
      ("user_id", "title", "url", "username", "deleted")
      VALUES
      ($1, $2, $3, $4, $5)
      RETURNING "id";
    `;
    const sqlValues = [req.user.id, soundclipTitle, soundclipUrl, req.user.username, false];
    pool.query(sqlText, sqlValues)
      .then((dbRes) => {
        let sqlText2 = `
              INSERT INTO "tags"
              ("soundclip_id", "tag")
              VALUES 
        `;
        let sqlValues2 = [
          dbRes.rows[0].id, // $1
        ];
        for (let i = 0; i < tagsArray.length; i++) {
          sqlText2 += `($1, $${i + 2})`;
          sqlValues2.push(tagsArray[i]);
          // If its the last tag being entered, add semicolon to end SQL query,
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
          .then((dbRes) => {
            res.sendStatus(200);
          })
          .catch((dbErr) => {
            console.log('/soundclips POST tags nested error:', dbErr);
            res.sendStatus(500);
          })
      })
      .catch((dbErr) => {
        console.log('/soundclips POST error:', dbErr);
        res.sendStatus(500);
      });
  };
});

router.get('/', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT * FROM "soundclips"
    ORDER BY lower("title");
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

//Update deleted boolean on specific soundclip to true.
router.put('/delete/:id', (req, res) => {
  if(req.user.access > 1){
  const sqlText = `
    SELECT * FROM "soundclips"
    WHERE "id"=$1;
  `;
  pool.query(sqlText, [req.params.id])
    .then((dbRes) => {
      if(dbRes.rows[0].user_id == req.user.id || req.user.access > 2){
        const sqlText2 = `
          UPDATE "soundclips"
          SET "deleted"=$1
          WHERE "id"=$2;
        `;
        pool.query(sqlText2, [true, req.params.id])
          .then((dbRes) => {
            res.sendStatus(200);
          })
          .catch((dbErr) => {
            console.log('/soundclips/delete/:id PUT update error:', dbErr);
            res.sendStatus(500);
          })
      };
    })
    .catch((dbErr) => {
      console.log('/soundclips/delete/:id PUT select error:', dbErr);
      res.sendStatus(500);
    })
  };
});

//Update deleted boolean on specific soundclip to false.
router.put('/restore/:id', rejectUnauthenticated, (req, res) => {
  if(req.user.access > 1){
  const sqlText = `
    SELECT * FROM "soundclips"
    WHERE "id"=$1;
  `;
  pool.query(sqlText, [req.params.id])
    .then((dbRes) => {
      if(dbRes.rows[0].user_id == req.user.id || req.user.access > 2){
        const sqlText2 = `
          UPDATE "soundclips"
          SET "deleted"=$1
          WHERE "id"=$2;
        `;
        pool.query(sqlText2, [false, req.params.id])
          .then((dbRes) => {
            res.sendStatus(200);
          })
          .catch((dbErr) => {
            console.log('/soundclips/restore/:id PUT update error:', dbErr);
            res.sendStatus(500);
          })
      };
    })
    .catch((dbErr) => {
      console.log('/soundclips/restore/:id PUT select error:', dbErr);
      res.sendStatus(500);
    })
  };
});

module.exports = router;