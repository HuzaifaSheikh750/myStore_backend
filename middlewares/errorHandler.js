function errorHandler(err, req, res, next) {
    console.error(err.stack);
    
    // Set default status code and message
    let statusCode = 500;
    let message = 'Internal Server Error';
    
    // Handle specific error types
    if (err.message.includes('not found')) {
      statusCode = 404;
      message = err.message;
    } else if (err.message.includes('Invalid currency code')) {
      statusCode = 400;
      message = err.message;
    } else if (err.name === 'ValidationError') {
      statusCode = 400;
      message = 'Validation Error: ' + Object.values(err.errors).map(e => e.message).join(', ');
    }
    
    res.status(statusCode).json({
      error: {
        message,
        status: statusCode,
        timestamp: new Date().toISOString()
      }
    });
  }
  
  module.exports = errorHandler;