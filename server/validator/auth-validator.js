const { z } = require("zod");



//create
const signupSchema = z.object({
  username: z
    .string({required_error: "Name  is required",})
    .trim()
    .min(5, { message: "Name must be at least 5 char " })
    .max(255, { message: "Name must not be more than 255 charracters" }),

  email: z
    .string({required_error: "Email  is required",})
    .trim()
    .email({message:"Invalide  Email address"})
    .min(5, { message: "Email must be at least 5 char " })
    .max(255, { message: "Email must not be more than 255 charracters" }),

  password: z
    .string({required_error: "password  is required",})
    .trim()
    .min(7, { message: "password must be at least 6 char " })
    .max(255, { message: "password can't not be more than 255 charracters" }),
});


module.exports=signupSchema;