const express = require('express');
const { create, deleteContact } = require('../controllers/contactController');
const { createSms, getSmsByStatus, readSms, getAllSmsSent } = require('../controllers/smsController');

const { validateContact, validateSms } = require('../middlewares/validators');

const router = express.Router();

router.post('/contact', validateContact, create);
router.delete('/contact/:id', deleteContact);
router.post('/sms', validateSms, createSms);
router.get('/sms/status/:id', getSmsByStatus);
router.get('/sms/sent/:id', getAllSmsSent)
router.put('/sms/read/:id', readSms);

module.exports = router;