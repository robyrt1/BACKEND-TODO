const { ExpressConfig } = require("./config/express.config.js");
const { EnvironmentShared } = require("./shared/environment.shared.js");
require("./config/mysql.config.js");


const expressConfig = new ExpressConfig()
const environmentShared = new EnvironmentShared()
const serverPort = environmentShared.getEnv("SERVER_PORT");


expressConfig.getServer().listen(serverPort, () =>{
    console.log(`[INFO] - Server is up running on port ${serverPort} `);
})





