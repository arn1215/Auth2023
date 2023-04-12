// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const passport = require("passport")

const CLIENT_URL = "http://localhost:3000"

router.get(CLIENT_URL, (req, res) => {
  if (req.user) {
    const firstName = req.user.name.givenName; // Retrieve user's first name
    const email = req.user.emails[0].value; // Retrieve user's email address

    res.status(200).json({
      success: true,
      message: "success",
      firstName: firstName,
      email: email
    });
  } else {
    res.status(401).json({
      success: false,
      message: "failure"
    });
  }
});


router.get("/logout", (req, res) => {
  req.logout()
  res.redirect(CLIENT_URL)
})

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  })
})

router.get('/api/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  // Custom callback for passport.authenticate
  (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login/failed');
      }
      // Log the user in and establish the session
      console.log(user, "JKASHFKSJDHFKJSDHF")
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // Set the XSRF-TOKEN cookie
        res.cookie('gh-token', user.access_token);
        return res.redirect(CLIENT_URL);
      });
    })(req, res, next);
  }
);

router.get('/api/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
  // Custom callback for passport.authenticate
  (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login/failed');
      }
      // Log the user in and establish the session
      console.log(user)
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // Set the XSRF-TOKEN cookie
        res.cookie('google-user', user.displayName);
        return res.redirect(CLIENT_URL);
      });
    })(req, res, next);
  }
);

router.use('/api', apiRouter);


// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

router.get('/hello/world', function (req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});


router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});
module.exports = router;

