const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Handle Sequelize validation errors
    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        const errors = err.errors.map(e => e.message).join(", ");
        return res.status(400).json({
            message: errors,
        });
    }

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        // Only show stack trace in development
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

module.exports = errorHandler;
