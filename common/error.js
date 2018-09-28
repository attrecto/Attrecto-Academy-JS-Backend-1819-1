const errorHandler = (e, next) => {
  try {
    console.log(e);
    if (e instanceof AppError) {
      next(e);
    } else {
      const error = new Error('Internal server error');
      error.status = 500;
      next(error);
    }
  } catch (e) {
    console.error(e);
    const error = new Error('Internal server error');
    error.status = 500;
    next(error);
  }
};

module.exports = {errorHandler};