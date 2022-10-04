const { EnvironmentShared } = require("../shared/environment.shared.js");
const { INTERNAL_SERVER_ERROR } = require("../shared/constants/http.codes.js");
const Mysql = require("sync-mysql");
class MysqlConfig {
  constructor() {
    this.EnvironmentShared = new EnvironmentShared();
    if (!MysqlConfig._instance) MysqlConfig._instance = this;

    this.connect();
    return this.getInstance();
  }

  getInstance() {
    return MysqlConfig._instance;
  }

  connect() {
    if (!this.getConnection()) {
      this.getInstance().connection = new Mysql({
        host: this.EnvironmentShared.getEnv("MYSQL_HOST"),
        user: this.EnvironmentShared.getEnv("MYSQL_USER"),
        password: this.EnvironmentShared.getEnv("MYSQL_PASSWORD"),
        database: this.EnvironmentShared.getEnv("MYSQL_DATABASE"),
        port: this.EnvironmentShared.getEnv("MYSQL_PORT"),
        dateString: true,
      });
      console.log("[INFO] - Database is connected")
    }
  }
  getConnection() {
    return this.getInstance().connection;
  }
  execQuery(query) {
    try {
      const result = this.getConnection().query(query);
      return result;
    } catch (error) {
      throw { statusCode: INTERNAL_SERVER_ERROR, error };
    }
  }
}

module.exports = new MysqlConfig() ;
