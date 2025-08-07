async function asyncHandler(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res, next);
    } catch (error) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal Server Error',
      });
    }
  };
}
export default asyncHandler;
