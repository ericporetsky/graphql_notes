
require('dotenv').config();
const express = require('express');
const router = express.Router(); 
const { Note, User } = require('../models');
const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET;
const api_key = process.env.API_KEY;

//Simple Api-Key Middleware
const verifyToken = (req, res, next) => {
    const key = req.headers['x-api-key'];
    if (key != process.env.API_KEY) {
      res.sendStatus(401);
    }
    else {
       next();
    }
}

//PROFILE
router.get('/users/:id', verifyToken, async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  const data = user.dataValues;

  if (!user) {
    return res.status(404).send({
      "message": "User could not be found."
    });
  }
  else {
    return res.json({"user": {
        "id": data.id,
        "email": data.email,
        "created_at": data.createdAt
    }});
  }
 
});

router.get('/users/:id/notes', verifyToken, async (req, res) => {
  
  const query = 
    { 
      where: 
      {
        userID: req.params.id
      },
    };

  if (req.query["order_by"]) {
      query["order"] = [[req.query["order_by"], req.query["direction"] != null ? req.query["direction"]: "DESC"]]
  }
  const notes = await Note.findAll(query);
  res.json({"notes": {...notes}});

});

//CREATE NOTE
router.post('/users/:id/notes', verifyToken, async (req, res) => {
    const note = await Note.create({description: req.body.description, userID: req.params.id});
    return res.json({
      "note": {
        id: note.id,
        description: note.description,
        createdBy: user
      }
    });
});

//GET NOTE
router.get('/users/:id/notes/:noteID', verifyToken, async (req, res) => {
    let note = await Note.findAll({ where: { id: req.params.noteID } });
    note = note[0]

    if (!note) {
      res.status(404).send({
        "message": "Note could not be found."
      });
    }
    else {
      return res.json({
        "note": {
          id: note.dataValues.id,
          description: note.dataValues.description,
          createdAt: note.dataValues.createdAt,
          updatedAt: note.dataValues.updatedAt,
        }
      });
    }
});


//DELETE NOTE
router.delete('/users/:id/notes/:noteID', verifyToken, async (req, res) => {
    const destroyCount = await Note.destroy({ where: { id: req.params.noteID } });
    if (destroyCount > 0) {
      res.status(200).send({
        "success": true
      });
    }
    else {
      res.status(500).send({
        "success": false
      });
    }
});

//UPDATE NOTE
router.put('/users/:id/notes/:noteID', verifyToken, async (req, res) => {
  const updateCount = await Note.update({description: req.body.description}, {where: {id: req.params.noteID}}); 
  if (updateCount > 0) {
      res.status(200).send({
        "success": true
      });
    }
  else {
    res.status(500).send({
      "success": false
    });
  }
});


module.exports = router;