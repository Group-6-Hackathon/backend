const Chart = require('../models/charting');

const createChart = async (chartBody) => {
    try {
        const chart = await Chart.create(chartBody);
        return chart;
    } catch (error) {
        throw new Error(`Chart creation error: ${error.message}`);
    }
};

const getAllCharts = async () => {
    try {
        const charts = await Chart.find();
        return charts;
    } catch (error) {
        throw new Error(`Get all charts error: ${error.message}`);
    }
};

const getChartById = async (id) => {
    try {
        const chart = await Chart.findById(id);
        return chart;
    } catch (error) {
        throw new Error(`Get chart by id error: ${error.message}`);
    }
};

const updateChartById = async (id, chartBody) => {
    try {
        const chart = await Chart.findByIdAndUpdate(id, chartBody, {new: true});
        return chart;
    } catch (error) {
        throw new Error(`Update chart by id error: ${error.message}`);
    }
};

const deleteChartById = async (id) => {
    try {
        const chart = await Chart.findByIdAndDelete(id);
        return chart;
    } catch (error) {
        throw new Error(`Delete chart by id error: ${error.message}`);
    }
};

const getChartsByPatientId = async (patientId) => {
    try {
        const chartings = await Chart.find({patientID: patientId});
        return chartings;
    } catch (error) {
        throw new Error(`Get charting by patient id error: ${error.message}`);
    }
}

module.exports = {
    createChart,
    getAllCharts,
    getChartById,
    updateChartById,
    deleteChartById,
    getChartsByPatientId
};