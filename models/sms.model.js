const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const smsSchema = new Schema({
  sender: { 
    type: Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  receiver: { 
    type: Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  message: { type: String, required: true },
  status: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sms', smsSchema);
