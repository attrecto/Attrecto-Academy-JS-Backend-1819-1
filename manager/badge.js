const {query} = requireFromRoot('db');
const AppError = requireFromRoot('common/AppError');

const getBadges = async () => {
  const sql = "SELECT * FROM `badges`";

  return query(sql);
};

const getBadge = async (id) => {
  const sql = "SELECT * FROM `badges` WHERE `id` = ?";

  const badges = await query(sql, [id]);

  if (badges.length === 0) {
    throw new AppError(404, 'Badge not found!')
  }

  return badges[0];
};

module.exports = {
  getBadges,
  getBadge
};