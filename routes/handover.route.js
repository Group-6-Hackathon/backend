const express = require('express');
const handoverController = require('../controllers/handover.controller');
const router = express.Router();

router.post('/', handoverController.createHandover);
router.get('/', handoverController.getAllHandovers);
router.get('/:id', handoverController.getHandoverById);
router.put('/:id', handoverController.updateHandoverById);
router.delete('/:id', handoverController.deleteHandoverById);

module.exports = router;