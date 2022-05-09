const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

// module.exports = {
//   DB_URL: "mongodb://localhost:7017/",
//   DB_NAME: 'api_blog',
// };


module.exports = {
  DB_URL: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/?authSource=admin`,
  NAME: DB_NAME,
};