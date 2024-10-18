const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const { validationResult, matchedData, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser.js');


const SEC_KEY = process.env.SECRET_KEY;

//ROUTE 1: POST request to Create a user. No login required
router.post('/signup',
  [
    body('name', 'Enter length of atleast 3').isLength({ min: 3 }),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 })
  ]
  ,
  async (req, res) => {
    const errors = validationResult(req);
    var success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const data = matchedData(req);
    // check if the email provided alread exists
    try {
      let user = await User.findOne({ email: data.email })
      if (user) {
        return res.status(400).json({success, error: "this email already in use" });
      }
      success = true;
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(data.password, salt);
      //Creating a new user
      user = await User.create({
        name: data.name,
        email: data.email,
        password: secPass
      });
      const jwtData = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(jwtData, SEC_KEY);
      // console.log(authToken);

      res.json({success, authToken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send({success, error:"Internal Server error"});
    }
  })

//ROUTE 2: Authenticate a user with email and password. No login Required
router.post('/login', [
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'Password cannot be empty').exists()
],
async (req, res) => {
  var success = false;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ success, errors: errors.array() });
  }
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success, error:'Please enter valid credentials'});
    }
    const passCompare = await bcrypt.compare(password, user.password);
    if(!passCompare){
      return res.status(400).json({success, error:'Please enter valid credentials'});
    }

    const jwtData = {
      user:{
        id: user.id
      }
    }
    success = true;
    const authToken = jwt.sign(jwtData, SEC_KEY);
    res.json({success, authToken});

  } catch (error) {
    console.error(error.message);
    res.status(500).send({success, error:"Internal server error"});
  }
})

//ROUTE 3: Get Loggedin User Details using: POST "api/auth/getuser". Login Required
router.post('/getuser', fetchuser, async (req, res) =>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;


