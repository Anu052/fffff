const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const fetchuser=require("../Middleware/fetchuser");

var jwt = require("jsonwebtoken");

const JWT_SECRET = "anurag$oy";
const { body, validationResult } = require("express-validator");
//Route 1: create a user using post "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "enter the vaild name").isLength({ min: 3 }),
    body("email", "enter the vaild email").isEmail(),
    body("password", "password must be at least 5 charactor").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      /*.then(user => res.json(user))
      .catch(err=>{console.log(err)
    res.json({error:'please enter the unique values',message:err.message})});*/
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// Route 2
router.post(
  "/login",
  [
    body("email", "enter the vaild email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user =await User.findOne({ email });
      if (!user) {
        success=false;
        return res
          .status(401)
          .json({ error: "Please login to correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res
          .status(401)
          .json({success, error: "Please login to correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
       success=true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }
  }
);

//Route 3 for get login user details
router.post("/getuser", fetchuser ,async (req, res) => {
  try {
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
  }
)
module.exports = router;
