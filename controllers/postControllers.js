const joi = require("joi");
const { responseError, responseMessage } = require("../config/commonFunction");
const { postImageForUser } = require("../functions/post");

const postImage = async (req, res) => {
  try {
    const validateBody = joi.object({
      caption: joi.string().allow(null, "").required(),
      filter: joi.string().allow(null, "").required(),
    });

    const validate = validateBody.validate(req.body);

    if (validate.error) {
      return responseMessage(
        res,
        400,
        validate.error.details.map((i) => i.message).join(",")
      );
    }
    return await postImageForUser(req, res);
  } catch (error) {
    return responseError(res, error);
  }
};

module.exports = {
  postImage,
};
