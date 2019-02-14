const Joi = require('joi');


exports.validateContact = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    phoneNumber: Joi.string().length(11).required(),
  });

  Joi.validate(req.body, schema, (error, data) => {

    if (error) {
      const message = error.details[0].message;
      res.status(400).send({ message });
    } else {
      next();
    }
  });
};

exports.validateSms = (req, res, next) => {
  const schema = Joi.object().keys({
    sender: Joi.string().required(),
    receiver: Joi.string().required(),
    message: Joi.string().required(),
  });

  Joi.validate(req.body, schema, (error, data) => {

    if (error) {
      const message = error.details[0].message;
      res.status(400).send({ message });
    } else {
      next();
    }
  });
};