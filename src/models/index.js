const { Sequelize, DataTypes } = require("sequelize");

const config = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "localhost"
};

if (!config.database || !config.username || !config.password) {
  throw new Error("DB_NAME, DB_USER and DB_PASSWORD must be configured in the environment");
}

const dbSequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
    logging: false
  }
);

const db = {
  Sequelize,
  dbSequelize
};

db.User = require("./user.model")(dbSequelize, DataTypes);

dbSequelize
  .authenticate()
  .then(() => dbSequelize.sync({ force: false }))
  .then(() => console.log("Database connected and models synchronized"))
  .catch(() => {
    console.error("Database connection or synchronization failed. Check local configuration.");
  });

module.exports = db;
