const notFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (error, _, res, __) => {
    console.log(res.statusCode);
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode);
    return res.json({
        status: statusCode,
        message: error?.message,
        stack: error?.stack,
    });
};

module.exports = { notFound, errorHandler };
