const mysql = require('mysql');

const credentials = {
  host: 'localhost',
  port: 3306,
  database: 'badge',
  user: 'badge_user',
  password: '12345'
};

const connect = () => new Promise((resolve, reject) => {
  const connection = mysql.createConnection(credentials);
  connection.connect((error) => {
    if (error) {
      return reject(error);
    }

    resolve(connection);
  })
});

const query = (connection, query, fields) => new Promise((resolve, reject) => {
  const queryObject = {
    sql: query
  };

  fields && Object.assign(queryObject, {...queryObject, fields});

  connection.query(queryObject, (error, results) => {
    if (error) {
      return reject(error);
    }

    resolve(results);
  })
});

const close = (connection) => {
  return new Promise((resolve, reject) => {
    connection.end();
    resolve(true);
  })
};

module.exports = {
  connect,
  query,
  close
};
