function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    error: 'Server error',
  });
}

module.exports = errorHandler;