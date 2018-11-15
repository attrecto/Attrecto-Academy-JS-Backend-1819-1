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

const getUserBadges = async (userId) => {
  const sql =
    "SELECT * FROM `badges` " +
    "INNER JOIN `users_badges` ON `users_badges`.`badge_id` = `badges`.`id` " +
    "WHERE `users_badges`.`user_id` = ?";

  const result = await query(sql, [userId]);

  return result;
};

const getUserBadge = async (userId, badgeId) => {
  const sql =
    "SELECT * FROM `badges` " +
    "INNER JOIN `users_badges` ON `users_badges`.`badge_id` = `badges`.`id` " +
    "WHERE `users_badges`.`user_id` = ? AND `badges`.`id` = ?";

  const result = await query(sql, [userId, badgeId]);

  if (result.length === 0) {
    throw new AppError(404, 'User/badge not found!');
  }

  return result[0];
};

const assignBadgeToUser = async (userId, badgeId) => {
  const sql = "INSERT INTO `users_badges` (`user_id`, `badge_id`) VALUES (?, ?)";

  // TODO: duplicate entry key hiba kezelese
  // TODO: ervenytelen badge vagy user id (404)
  const result = await query(sql, [userId, badgeId]);

  return result;
};

const removeBadgeFromUser = async (userId, badgeId) => {
  const sql = "DELETE FROM `users_badges` WHERE `user_id` = ? AND `badge_id` = ?";

  const result = await query(sql, [userId, badgeId]);

  if (result.affectedRows === 0) {
    throw new AppError(404, 'User and/or badge not found!');
  }

  return result;
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserBadges,
  getUserBadge,
  assignBadgeToUser,
  removeBadgeFromUser,
};