const { query } = requireFromRoot('db');
const AppError = requireFromRoot('common/AppError');

const getUsers = async () => {
  const sql = "SELECT * FROM `users`";

  return query(sql);
};

const createUser = async (data) => {
  const sql = "INSERT INTO `users` (`name`) VALUES (?)";

  const result = await query(sql, [data.name]);

  return result;
};

const getUser = async (id) => {
  const sql = "SELECT * FROM `users` WHERE `id` = ?";

  const users = await query(sql, [id]);

  if (users.length === 0) {
    throw new AppError(404, 'User not found!');
  }

  return users[0];
};

const updateUser = async (id, data) => {
  const sql = "UPDATE `users` SET `name` = ? WHERE `id` = ?";

  const result = await query(sql, [data.name, id]);

  if (result.affectedRows === 0) {
    throw new AppError(404, 'User not found!');
  }

  return result;
};

const deleteUser = async (id) => {
  const sql = "DELETE FROM `users` WHERE `id` = ?";

  const result = await query(sql, [id]);

  if (result.affectedRows === 0) {
    throw new AppError(404, 'User not found!');
  }

  return result;
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};