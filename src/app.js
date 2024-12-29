const express = require("express");
const path = require("path");
const configObject = require("./config/env.config");
const { logger } = require("./middlewares/logger.middleware");
const setupRoutes = require("./middlewares/routes.middleware");
const handlebarsMiddleware = require("./middlewares/handlebars.middleware");

require("./config/connection.config");

const app = express();
const PORT = configObject.server.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

handlebarsMiddleware(app);
setupRoutes(app);

app.listen(PORT, () => {
  try {
    logger.info(`Servidor escuchando en el puerto ${PORT}`);
    logger.info(`Servidor ejecutandose en la ulr http://localhost:${PORT}`);
  } catch (err) {
    logger.error("Error interno del servidor", err.message);
  }
});

module.exports = app;
