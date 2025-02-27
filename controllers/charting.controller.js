const chartService = require('../services/charting.service');

const createChart = async (req, res) => {
    try {
        const chart = await chartService.createChart(req.body);
        res.status(201).json(chart);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const getAllCharts = async (req, res) => {
    try {
        const charts = await chartService.getAllCharts();
        res.status(200).json(charts);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const getChartById = async (req, res) => {
    try {
        const chart = await chartService.getChartById(req.params.id);
        res.status(200).json(chart);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const updateChartById = async (req, res) => {
    try {
        const chart = await chartService.updateChartById(req.params.id, req.body);
        if (!chart){
            res.status(404).json({message: `Chart ${req.params.id} not found.`});
        }
        res.status(200).json(chart);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const deleteChartById = async (req, res) => {
    try {
        const chart = await chartService.deleteChartById(req.params.id);
        if (!chart){
            res.status(404).json({message: `Chart ${req.params.id} not found.`});
        }
        res.status(204).json({message: "Chart deleted."});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports = {
    createChart,
    getAllCharts,
    getChartById,
    updateChartById,
    deleteChartById
};