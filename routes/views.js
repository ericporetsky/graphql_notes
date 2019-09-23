
require('dotenv').config();
const express = require('express');
const router = express.Router(); 
const pug = require('pug');
const {
    signup, 
    login, 
    profile,
    createNote,
    deleteNote,
    updateNote
} = require('../util/helpers');
const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET;

//CUSTOM MIDDLEWARE TO VERIFY A JWT
const verify = (req, res, next) => {
  const id = req.params.id;
  const token = req.cookies.token;
  if  (!token) {
    res.sendStatus(401);
  }
  else {
     const session = jwt.verify(token,  jwt_secret);
     if (id != session.id) {
      res.sendStatus(401);
     }
     else {
         next();
     }
  }
}

//VIEWS
router.get('/', (req, res) => {
	res.redirect('/login')
})

router.get('/signup', (req, res) => {
	res.render('signup');

});

router.get('/login', (req, res) => {
  //redirect logged in users
  
  res.render('login');
 
});

//LOGIN
router.post('/login', async (req, res) => {
  const data = await login(req.body.email, req.body.password)
  const token = data.login.token
  const id = data.login.user.id
  res.cookie('token', token, {httpOnly: true});
  res.redirect(`/users/${id}`);
});

//SIGNUP
router.post('/signup', async (req, res) => {
	const data = await signup(req.body.email, req.body.password)
	const token = data.signup.token
	const id = data.signup.user.id
	res.cookie('token', token, {httpOnly: true});
	res.redirect(`/users/${id}`);
});

//PROFILE
router.get('/users/:id', verify, async (req, res) => {
   const data = await profile(req.cookies.token);
   const notes = data.getNotes;
   const userInfo= data.me;

   //sort notes by ID
   const compare = (a, b) => {
    if (parseInt(a.id) > parseInt(b.id)) return 1;
    if (parseInt(a.id) < parseInt(b.id)) return -1;
    return 0;
  }
   sorted = notes.sort(compare);
   res.render('profile', {"notes": sorted, "info": userInfo});

});

//CREATE NOTE
router.post('/note', async (req, res) => {
  const description = req.body.description;
  const data = await createNote(description, req.cookies.token)
  res.redirect('back');
});


//DELETE NOTE
router.delete('/note', async (req, res) => {
  const id = req.body.id;
  const data = await deleteNote(id, req.cookies.token)
  if (data.deleteNote) {
    res.sendStatus(200);
  }
  else {
    res.sendStatus(400);
  }
});

//UPDATE NOTE
router.put('/note', async (req, res) => {
  const data = await updateNote(req.body, req.cookies.token)
  if (data.updateNote) {
    res.sendStatus(200);
  }
  else {
    res.sendStatus(400);
  }
});

//UPDATE NOTE
router.post('/logout', async (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
});


module.exports = router;