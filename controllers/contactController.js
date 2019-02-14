const Contact = require('../models/contact.model');

/**
 * Creates a new contact
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.create = (req, res, next) => {
  const { name, phoneNumber } = req.body;
  const contactNum = phoneNumber.trim();
  Contact.findOne({ phoneNumber: contactNum })
    .exec()
    .then((contact) => {
      if(contact) {
        return res.status(409)
          .send({ message: 'This contact already exists' });
      }
      const newContact = new Contact({ name, phoneNumber: contactNum });
      newContact.save((error, data) => {
        if (error) {
          return next(error);
        }
        res.status(201).send({
          message: 'You just created a new contact',
          contact: data,
        });
      });
    })
    .catch((error) => {
      next(error);
    })
}

/**
 * Method that deletes a contact
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.deleteContact = (req, res, next) => {
  const {id} = req.params;

  Contact.findById(id)
    .exec()
    .then((contact) => {
      if (!contact) {
        return res.status(404)
          .send({ message: 'contact not found' })
      }
      contact.remove();
      contact.save();
      res.status(200)
        .send({ message: 'Contact deleted successfully' })
    })
    .catch(error => next(error))
}
