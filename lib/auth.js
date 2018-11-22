'use strict';

const {randomBytes} = require('crypto');
const {hash: bcryptHash, compare: bcryptVerify} = require('bcrypt');
const {sign: jwtSign, verify: jwtVerify} = require('jsonwebtoken');

const BCRYPT_ROUNDS = +process.env.BCRYPT_ROUNDS || 10;
const JWT_SECRET = process.env.JWT_SECRET || randomBytes(16);

const jsonWebTokenOptions = {
  expiresIn: '7 days',
  algorithm: 'HS256',
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwtVerify(
      token,
      JWT_SECRET,
      (err, decoded) =>
        err ? reject(new AppError(401, 'Unauthorized')) : resolve(decoded)
    );
  });

const createToken = (payload) =>
  new Promise((resolve, reject) => {
    jwtSign(
      payload,
      JWT_SECRET,
      jsonWebTokenOptions,
      (err, token) => (err ? reject(err) : resolve(token))
    );
  });

const hashPassword = (plainPassword) =>
  bcryptHash(plainPassword, BCRYPT_ROUNDS);

const verifyPassword = (plainPassword, hash) =>
  bcryptVerify(plainPassword, hash);

module.exports = {
  verifyToken,
  createToken,
  hashPassword,
  verifyPassword,
};
