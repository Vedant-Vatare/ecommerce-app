function asyncHandler(handler) {
  return function (req, res, next) {
    Promise.resolve(handler(req, res, next)).catch((error) => {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal Server Error',
      });
    });
  };
}

export default asyncHandler;
