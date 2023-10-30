const LocalStrategy = require("passport-local").Strategy;
const CustomError = require("../src/common/CustomError");
const User = require("../src/models/User"); // Adjust the path based on your project structure

module.exports = (passport) => {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await User.findOne({ username: username });

                if (!user) {
                    return done(null, false);
                }

                if (!user.validPassword(password)) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        return done(null, user);
    });
};
