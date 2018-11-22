const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
});

const query = (query, bindParams) =>
  new Promise((resolve, reject) => {
    const queryObject = {
      sql: query,
    };

    bindParams && Object.assign(queryObject, {values: bindParams});

    return pool.query(queryObject, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
    });
  });

module.exports = {
  query,
};
