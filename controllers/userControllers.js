const { responseError, responseMessage } = require("../config/commonFunction");
const joi = require("joi");
const { followOrUnFollowUser } = require("../functions/user");

const followUser = async (req, res) => {
  try {
    const validateBody = joi.object({
      userId: joi.string().required(),
    });

    const validate = validateBody.validate(req.params);

    if (validate.error) {
      return responseMessage(
        res,
        400,
        validate.error.details.map((i) => i.message).join(",")
      );
    }

    return await followOrUnFollowUser(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

module.exports = {
  followUser,
};
