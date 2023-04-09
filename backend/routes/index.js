// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const passport = require("passport")

const CLIENT_URL = "http://localhost:3000"

router.get(CLIENT_URL, (req, res) => {
  if (req.user) {

    res.status(200).json({
      success: true,
      message: "success",
      user: req.user,
      // cookies: req.cookies
    })
  }
})

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

router.get("/google", passport.authenticate("google", { scope: ["profile"] }))

router.get("/google/callback", passport.authenticate("google", {
  successRedirect: CLIENT_URL,
  failureRedirect: "/login/failed"
  // todo make prod equiv
}))
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

