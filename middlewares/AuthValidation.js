const joi = require("joi");

// Backend validation for signup
const signupValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(1).max(20).required(),
    lastname: joi.string().min(4).max(20).required(),
    email: joi
      .string()
      .email()
      .pattern(/^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Email must start with a letter and have a valid domain format",
      }),
    phone: joi
      .string()
      .pattern(/^\d{10}$/)
      .required(),
    dob: joi.date().iso().required(),
    gender: joi.string().valid("male", "female", "other").required(),
    password: joi.string().min(8).required(),
    ConfPassword: joi
      .string()
      .required()
      .valid(joi.ref("password"))
      .messages({ "any.only": "Passwords must match" }),
    country: joi.string().required(),
    state: joi.string().allow(""),
    pincode: joi
      .string()
      .pattern(/^\d{5,6}$/)
      .required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const passwordError = error.details.find((err)=>err.context.key === "password")
    const EmailError = error.details.find((err)=>err.context?.key=== "email")
    const phoneError = error.details.find(
      (err) => err.context?.key === "phone"
    );
    const lastnameError = error.details.find(
      (err) => err.context?.key === "lastname"
    );
    if(passwordError){
        return res.status(398).json({
            message:'8 char is must in pass',
            error:passwordError.message
        })
    }
    if(EmailError){
        return res.status(399).json({
            message:'Email must be in valid format',
            error:EmailError.message
        })
    }
    if (lastnameError) {
      return res.status(401).json({
        message: "lastname must be atlease 4 char long",
        error: lastnameError.message,
      });
    }
    if (phoneError) {
      return res.status(402).json({
        message: "Phone number format is wrong",
        error: phoneError.message,
      });
    }
    return res.status(400).json({
      message: "Bad request",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Bad request",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = { signupValidation, loginValidation };
