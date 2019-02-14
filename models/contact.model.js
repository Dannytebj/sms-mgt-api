const mongoose = require('mongoose');

const Sms = require('./sms.model');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true }
});

// We need this to cascade delete when a contact is deleted
contactSchema.pre('remove', function(next) {
  Sms.remove({ sender: this._id }).exec();
  Sms.remove({ receiver: this._id }).exec();
  next();
})
module.exports = mongoose.model('Contact', contactSchema);
