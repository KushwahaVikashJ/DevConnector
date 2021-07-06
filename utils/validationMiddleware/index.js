"use strict";

module.exports = (joiSchema, reqProperty) => {
  return (req, res, next) => {
    const { error } = joiSchema.validate(req[reqProperty]);
    if (error) {     
      return res.status(422).send({
        status: false,
        msg: error.message,
      });
    }
    next();
  };
};
