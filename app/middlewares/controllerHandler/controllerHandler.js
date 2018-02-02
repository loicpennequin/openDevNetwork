'use strict';

module.exports = (promise, params) => async (req, res, next) => {
    let boundParams = params ? params(req, res, next) : [];
    try {
        let result = await promise(...boundParams);
        return res.json(result || { message: 'OK' });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || error);
    }
};
