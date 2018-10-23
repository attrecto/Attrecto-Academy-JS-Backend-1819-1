const {query} = requireFromRoot('db');
const AppError = requireFromRoot('common/AppError');

const getBadges = async () => {
  const sql = "SELECT * FROM `badges`";

  return query(sql);
};

const getBadge = async (id) => {
  const sql = "SELECT * FROM `badges` WHERE `id` = ?";

  const badge = await query(sql, [id]);

  if (badge.length === 0) {
    throw new AppError(404, 'Badge not found!')
  }

  return badge;
};

module.exports = {
  getBadges,
  getBadge
};