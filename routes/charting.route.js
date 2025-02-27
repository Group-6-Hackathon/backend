const express = require('express');
const chartController = require('../controllers/charting.controller');
const router = express.Router();

router.post('/', chartController.createChart);
router.get('/', chartController.getAllCharts);
router.get('/:id', chartController.getChartById);
router.get('/patient/:patientId', chartController.getChartsByPatientId);
router.put('/:id', chartController.updateChartById);
router.delete('/:id', chartController.deleteChartById);

module.exports = router;