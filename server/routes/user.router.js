const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password, access, soundboard_access)
    VALUES ($1, $2, $3, $4) RETURNING id`;
  pool
    .query(queryText, [username, password, 1, false])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// Handle access request for soundboard
router.put('/soundboardrequest', rejectUnauthenticated, (req, res) => {
  const queryText = `
    UPDATE "user"
    SET "soundboard_access"=$1
    WHERE "id"=$2;
  `;
  pool.query(queryText, [true, req.user.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log('/user/soundboardrequest PUT error:', dbErr);
      res.sendStatus(500);
    })
});

//Get users for admin view
router.get('/admin', rejectUnauthenticated, (req, res) => {
  console.log(req.user);
  if(req.user.access == 3){
    const queryText = `
      SELECT "id", "username", "access", "soundboard_access" FROM "user"
      WHERE "access"<$1
      ORDER BY "soundboard_access" DESC;
    `;
    pool.query(queryText, [3])
      .then((dbRes) => {
        res.send(dbRes.rows);
      })
      .catch((dbErr) => {
        console.log('/user/admin GET error:', dbErr);
      })
  }else if(req.user.access == 4){
    const queryText = `
      SELECT "id", "username", "access", "soundboard_access" FROM "user"
      WHERE "access"<$1
      ORDER BY "soundboard_access" DESC;
    `;
    pool.query(queryText, [4])
      .then((dbRes) => {
        res.send(dbRes.rows);
      })
      .catch((dbErr) => {
        console.log('/user/admin GET error:', dbErr);
      })
  }else{
    res.sendStatus(500);
  };
});

//Get selected user for managing access.
router.get('/selected/:id', rejectUnauthenticated, (req, res) => {
  if(req.user.access > 2){
    const queryText = `
      SELECT "id", "username", "access", "soundboard_access" FROM "user"
      WHERE "id"=$1;
    `;
    pool.query(queryText, [req.params.id])
      .then((dbRes) => {
        if(req.user.access >= dbRes.rows[0].access){
          res.send(dbRes.rows[0]);
        }else{
          res.sendStatus(500);
        };
      })
      .catch((dbErr) => {
        console.log('/user/:id GET error:', dbErr);
      })
  };
});

//Update selected user access.
router.put('/selected/:id', rejectUnauthenticated, (req, res) => {
  console.log('in update', req.body);
  if(req.user.access > 2){
    const queryText = `
      UPDATE "user"
      SET "access"=$1, "soundboard_access"=$2
      WHERE "id"=$3;
    `;
    pool.query(queryText, [req.body.userAccess, false, req.params.id])
      .then((dbRes) => {
        res.sendStatus(200);
      })
      .catch((dbErr) => {
        console.log('/user/:id access PUT error:', dbErr);
      })
  };
})

module.exports = router;
