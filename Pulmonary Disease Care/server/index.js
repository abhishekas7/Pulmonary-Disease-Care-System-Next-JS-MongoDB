import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import passport from 'passport';
import session from 'express-session';
import bodyParser from "body-parser";
import Routes from '../server/routes/routes.js'
import './database/db.js'
// import './util/passport.js'
// import './config/passport.js'
import flash from 'connect-flash'
// import User from './model/UserModel.js'; 
import Users from './model/UserModel.js';
import bcrypt from 'bcrypt'
import connectMongo from 'connect-mongo';
import LocalStrategy from 'passport-local';
import User from './model/UserModel.js'; 

const app = express();

const port = process.env.PORT || 8000
app.use(cors())

// const MongoStore = connectMongo(session);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  session({
    secret: 'secret',
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },// 1 day
    saveUninitialized: false,
    
  })
);

app.use(passport.initialize());
app.use(passport.session());


// Initialize the connect-flash middleware
app.use(flash());

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await Users.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});


// app.post('/login', function(req, res, next) {
//   // Set custom properties on the request object
//   req.body.username = req.body.email; // Assume the email is used as username

//   // Call the passport.authenticate middleware with the "local" strategy and options
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   })(req, res, next);
// });

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

// app.post('/login', passport.authenticate('local'), (req, res) => {
//   res.json({ user: req.user });
// });

app.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully.' });
});











// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());


app.get("/", function(req, res){
  // req.session.key = value
  res.send(req.session.id)
})
const isAuthenticated = (req, res, next) => {
  const sessionID = Cookies.get('sessionID');
  if (!sessionID) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  // Verify session ID in the database
  Session.findOne({ sessionID }, (err, session) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ message: 'Session expired' });
    }
    // Add user information to request object
    User.findById(session.userID, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      req.user = user;
      next();
    });
  });
};

app.get('/login', (req, res) => {
  if (req.sessionID) {
    // User is authenticated, so allow access to the dashboard
    res.send(req.sessionID)
  }else{
    res.send('fail')
  }
});
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    // User is authenticated, so allow access to the dashboard
    res.render('dashboard');
  } else {
    // User is not authenticated, so redirect to the login page
    res.redirect('/login');
  }
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await Users.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});



app.use('/', Routes);
app.listen(port, function(error){
  if(error) throw error
  console.log("Server created Successfully on port :", port)
})



// http post - http://localhost:7501/logout
// app.post("/logout", (req, res) => {
//   req.session.destroy();
//   console.log('good');
//   return res.status(204).json({ info: "User logged out" });
// });

// app.listen(port,() => console.log(`Server Running on port ${port}`))

app.delete('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
// app.get('/logout', function(req, res){
//   req.logout();
//   req.session.destroy(function(err) {
//     res.send('success');
//   });
// });
// app.get('/logout', function(req, res){
//   req.logout(function(err) {
//     if(err) return next(err);
//     res.redirect('/');
//   });
// });