const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
GOOGLE_CLIENT_ID = '456090067734-snrcfgjldm2mr5it5tm1ii6be5n6e9o1.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET = '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'

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/google/callback"
},
  function (accessToken, refreshToken, profile, cb, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    done(null, profile)
  }
));

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
  // const user = {username: profile.displayName}
})