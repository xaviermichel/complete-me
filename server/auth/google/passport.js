var passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy;

exports.setup = function(User, config) {
    passport.use(new GoogleStrategy({
            returnURL: 'http://www.example.com/auth/google/return',
            realm: 'http://www.example.com/'
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({
                'google.id': profile.id
            }, function(err, user) {
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        role: 'user',
                        username: profile.username,
                        provider: 'google',
                        google: profile._json
                    });
                    user.save(function(err) {
                        if (err) done(err);
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            });
        }
    ));
};
