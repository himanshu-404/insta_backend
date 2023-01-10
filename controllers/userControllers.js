const { responseError, responseMessage } = require("../config/commonFunction");
const joi = require("joi");
const { loginUser, registerUser } = require("../functions/users");

const userLogin = async (req, res) => {
  try {
    const validateBody = joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    });

    const validate = validateBody.validate(req.body);

    if (validate.error) {
      return responseMessage(
        res,
        400,
        validate.error.details.map((i) => i.message).join(",")
      );
    }

    return await loginUser(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

const userRegister = async (req, res) => {
  try {
    const validateBody = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required().min(6),
      username: joi.string().required().max(20),
      fullName: joi.string().required().max(20),
    });

    const validate = validateBody.validate(req.body);

    if (validate.error) {
      return responseMessage(
        res,
        400,
        validate.error.details.map((i) => i.message).join(",")
      );
    }

    return await registerUser(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

module.exports = {
  userLogin,
  userRegister,
};
