'use strict';

const {query} = requireFromRoot('db');
const {verifyPassword} = requireFromRoot('lib/auth');

const authUser = async (name, password) => {
  const sql = 'SELECT * FROM `users` WHERE `name` = ?';

  const [user] = await query(sql, [name]);

  console.log('user', user);

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  if (await verifyPassword(password, user.password)) {
    return user;
  } else {
    throw new AppError(400, 'Invalid password');
  }
};

module.exports = {
  authUser,
};
