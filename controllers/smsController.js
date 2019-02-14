const Sms = require('../models/sms.model');

/**
 * Creates an sms record
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.createSms = (req, res, next) => {
  const { sender, receiver, message }= req.body; 
  const newSms = new Sms({
    sender, receiver, message, status: 'unread'
  });
  newSms.save((error, savedSms) => {
    if(error) {
      return next(error);
    }
    res.status(201)
      .send({ 
        message: 'You have created an sms record',
        savedSms
      });
  });
};

/**
 * Gets sms by status - read | unread
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * 
 */
exports.getSmsByStatus = (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (status === '' || status === undefined) {
    return res.status(400)
      .send({ message: 'Please provide status' })
  }

  Sms.find({ receiver: id, status }, 'message status')
    .populate('sender', 'name phoneNumber')
    .then((unreadMessage) => {
      if(!unreadMessage) {
        return res.status(200)
          .send({ message: `There are no ${status} messages` })
      }
      res.status(200)
        .send({ 
          message: 'messages fetched successfully',
          messages: unreadMessage
      })
    })
    .catch(error => next(error));
}

/**
 * This updates the status of an sms from
 * unread to read.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.readSms = (req, res, next) => {
  const { id } = req.params;
  Sms.findById(id)
    .exec()
    .then((smsModel) => {
      if (!smsModel) {
        res.status(404)
          .send({ message: 'message not found' })
      } else if(smsModel.status === 'read') {
        res.status(409)
          .send({ message: 'message has already been read' })
      } else {
        smsModel.status = 'read';
        smsModel.updatedAt = Date.now();
        smsModel.save();
        res.status(200)
          .send({ message: 'successfully read message' })
      }
    })
    .catch(error => next(error))
}

/**
 * Get's all sent messages of a contact
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getAllSmsSent = (req, res, next) => {
  const {id} = req.params;
  Sms.find({ sender: id }, 'message status')
  .populate('receiver', 'name phoneNumber')
  .then((allSentMsg) => {
    if(!allSentMsg) {
      return res.status(200)
        .send({ message: 'This user has not sent any message' })
    }
    res.status(200)
      .send({ 
        message: 'messages fetched successfully',
        messages: allSentMsg
    })
  })
  .catch(error => next(error));
}
