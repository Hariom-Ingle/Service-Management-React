const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmine: {
    type: Boolean,
    default: false,
  },
});

//? Secure the password with bcrypt

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;

    next(); // Call next() to move to the next middleware or save operation
  } catch (error) {
    next(error);
  }
});


// // compare password 

//  userSchema.method.comparePassword =async function (password)  {
// return bsrypt .compare(password, this.password)

//  }




// json Web Token

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmine: this.isAdmine,
      },
      process.env.JWT_SECRETKEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

//  define the collection or model

const User = new mongoose.model("User", userSchema);

module.exports = User;
