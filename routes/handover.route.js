const express = require('express');
const router = express.Router();
const handoverController = require('../controllers/handover.controller');

router.post('/', handoverController.createHandover);
router.get('/', handoverController.getAllHandovers);
router.get('/:id', handoverController.getHandoverById);
router.get('/patient/:patientId', handoverController.getHandoversByPatientId);
router.put('/:id', handoverController.updateHandoverById);
router.delete('/:id', handoverController.deleteHandoverById);

module.exports = router;