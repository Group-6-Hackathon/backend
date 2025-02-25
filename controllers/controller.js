/*
* Returns a response for a route, interacts with service layer
*/
const service = require('../services/service');

// Example
// exports.get = async (req, res) => {
//     try {
//         const models = await service.get();
//         res.status(200);
//     } catch (error) {
//         res.status(400).json({ message: 'Error message'});
//     }
// };