const {query} = requireFromRoot('db');
const AppError = requireFromRoot('common/AppError');

const getBadges = async () => {
  const sql = "SELECT * FROM `badges`";

  return query(sql);
};

const createBadge = async (data) => {
  const sql = "INSERT INTO `badges` (`name`, `description`) VALUES (?, ?)";

  const result = await query(sql, [data.name, data.description || null]);

  return result;
};

const getBadge = async (id) => {
  const sql = "SELECT * FROM `badges` WHERE `id` = ?";

  const badges = await query(sql, [id]);

  if (badges.length === 0) {
    throw new AppError(404, 'Badge not found!');
  }

  return badges[0];
};

const updateBadge = async (id, data) => {
  const sql = "UPDATE `badges` SET `name` = ?, `description` = ? WHERE `id` = ?";

  const result = await query(sql, [data.name, data.description || null, id]);

  if (result.affectedRows === 0) {
    throw new AppError(404, 'Badge not found!');
  }

  return result;
};

const deleteBadge = async (id) => {
  const sql = "DELETE FROM `badges` WHERE `id` = ?";

  const result = await query(sql, [id]);

  if (result.affectedRows === 0) {
    throw new AppError(404, 'Badge not found!');
  }

  return result;
};

module.exports = {
  getBadges,
  getBadge,
  createBadge,
  updateBadge,
  deleteBadge
};