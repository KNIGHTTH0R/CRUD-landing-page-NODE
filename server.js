const express = require('express'),
<<<<<<< 55da757d912e0737902a8791ef91e5d37479124e
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    cookieParser = require('cookie-parser'),
=======
>>>>>>> First commit
    router = express.Router(),
    bodyParser = require('body-parser'),
    path = require('path');

const ejs = require('ejs');

<<<<<<< 55da757d912e0737902a8791ef91e5d37479124e
require('dotenv').config();

const mongoose = require('mongoose'),
    mongoURL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:19014/${process.env.DB_DATABASENAME}`,
    MongoStore = require('connect-mongo')(session),
    connect_db = mongoose.connect(mongoURL).then(() => {
        console.log("CONNECTED SUCCESFULLY TO THE DATABASE");

        const app = express(),
            port = process.env.PORT || 8000;

        app.use(express.static(path.join(__dirname, 'public')));

        const User = require('./models/user');

        passport.use(new LocalStrategy(
            function(username, password, done) {
                User.findOne({ username: username }, function(err, user) {
                    if (err) { return done(err); }
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                });
            }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });

        app.use(cookieParser());
        app.use(session({
            resave: true,
            saveUninitialized: true,
            secret: process.env.DB_SECRET,
            store: new MongoStore({ url: mongoURL, autoReconnect: true, collection: 'sessions' })
        }))

        app.use(passport.initialize());
        app.use(passport.session());

=======
const { database } = require('./config/database'),
    mongoose = require('mongoose'),
    connect_db = mongoose.connect(database).then(() => {
        console.log("CONNECTED SUCCESFULLY TO THE DATABASE");

        const app = express(),
            port = process.env.PORT || 3030;

        app.use(express.static(path.join(__dirname, 'public')));

>>>>>>> First commit
        app.set('view engine', 'ejs');

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

<<<<<<< 55da757d912e0737902a8791ef91e5d37479124e
        const mainRoute = require('./routes/home'),
            optionsRoute = require('./routes/options'),
            contactRoute = require('./routes/contact');

        app.use(mainRoute);
        app.use(optionsRoute);
        app.use(contactRoute);

=======
        const mainRoute = require('./routes/home');

        app.use(mainRoute);
>>>>>>> First commit

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        })

    }).catch((error) => {
        console.error(`Error during connect to the DATABASE: ${error}`);
    })