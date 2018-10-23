const {query} = requireFromRoot('db');

const getBadges = async () => {
  const sql = "SELECT * FROM `badges`";

  return query(sql);
};

module.exports = {
  getBadges
};