'use strict';

const {errorHandler} = requireFromRoot('common/error');
const {verifyToken} = requireFromRoot('lib/auth');

const auth = () => async (req, res, next) => {
  try {
    const bearerToken = req.header('authorization');

    if (!bearerToken) {
      return next(new AppError(401, 'Unauthorized'));
    }

    const [, token] = bearerToken.split(' ');

    if (!bearerToken) {
      return next(new AppError(401, 'Unauthorized'));
    }

    await verifyToken(token);

    next();
  } catch (error) {
    errorHandler(error, next);
  }
};

module.exports = auth;
