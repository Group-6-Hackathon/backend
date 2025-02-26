const Handover = require('../models/handover');

const createHandover = async (handoverBody) => {
    try {
        const handover = await Handover.create(handoverBody);
        return handover;
    } catch (error) {
        throw new Error(`Handover creation error: ${error.message}`);
    }
};

const getAllHandovers = async () => {
    try {
        const handovers = await Handover.find();
        return handovers;
    } catch (error) {
        throw new Error(`Get all handovers error: ${error.message}`);
    }
};

const getHandoverById = async (id) => {
    try {
        const handover = await Handover.findById(id);
        return handover;
    } catch (error) {
        throw new Error(`Get handover by id error: ${error.message}`);
    }
};

const updateHandoverById = async (id, handoverBody) => {
    try {
        const handover = await Handover.findByIdAndUpdate(id, handoverBody, {new: true});
        return handover;
    } catch (error) {
        throw new Error(`Update handover by id error: ${error.message}`);
    }
};

const deleteHandoverById = async (id) => {
    try {
        const handover = await Handover.findByIdAndDelete(id);
        return handover;
    } catch (error) {
        throw new Error(`Delete handover by id error: ${error.message}`);
    }
};

module.exports = {
    createHandover,
    getAllHandovers,
    getHandoverById,
    updateHandoverById,
    deleteHandoverById
};