const response = {
    successResponse: (res, statusCode ,message, data) => {
        res.status(statusCode).json({ success: true, statusCode, message, data });
    },

    errorResponse: (res, statusCode, message) => {
        res.status(statusCode).json({ success: false, message });
    }
};


export default response;