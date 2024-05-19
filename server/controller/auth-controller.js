const express = require("express");
const User = require("../models/user-model");
// const router = express.Router();
const bcrypt = require("bcryptjs");

//****   USER REGISTRATION *****/ /

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "email already Exists" });
    }

    // //*** Bcrypt hash the password   ***/
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);
    // await User.create({ username, email, password: hash_password });
    const userCreated = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      msg: "registration Sucessful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res;
    // .status(500)
    // .json({ error: "Internal server error", message: error.message });
    next(err);
  }
};

//****   USER LOGIN *****/ /

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credential" });
    }
    // const  user= await bcrypt.compare(password,userExist.password)
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    // const  isPasswordValid = await  userExist.comparePassword(password);

    console.log(userExist.password);
    if (isPasswordValid) {
      res.status(200).json({
        message: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    next(error);

    // res
    //   .status(500)
    //   .json({ error: "Internal server error", message: error.message });
  }
};

//****   USER LOgic to send user login  *****/ /
const  user =async(req, res)=>{
  try {
    const userData =req.user;
    // console.log(userData);
    
return res.status(200).json({userData})
    
  } catch (error) {
    console.log(` error from the user route${error}`)
    
  }
}

module.exports = { register, login,user };
