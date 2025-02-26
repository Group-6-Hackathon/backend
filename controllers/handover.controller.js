const handoverService = require('../services/handover.service');

const createHandover = async (req, res) => {
    try {
        const handover = await handoverService.createHandover(req.body);
        res.status(201).json(handover);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const getAllHandovers = async (req, res) => {
    try {
        const handovers = await handoverService.getAllHandovers();
        res.status(200).json(handovers);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const getHandoverById = async (req, res) => {
    try {
        const handover = await handoverService.getHandoverById(req.params.id);
        res.status(200).json(handover);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const updateHandoverById = async (req, res) => {
    try {
        const handover = await handoverService.updateHandoverById(req.params.id, req.body);
        if (!handover){
            res.status(404).json({message: `Handover ${req.params.id} not found.`});
        }
        res.status(200).json(handover);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const deleteHandoverById = async (req, res) => {
    try {
        const handover = await handoverService.deleteHandoverById(req.params.id);
        if (!handover){
            res.status(404).json({message: `Handover ${req.params.id} not found.`});
        }
        res.status(204).json({message: "Handover deleted."});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports = {
    createHandover,
    getAllHandovers,
    getHandoverById,
    updateHandoverById,
    deleteHandoverById
};