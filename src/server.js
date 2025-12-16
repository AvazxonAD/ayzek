const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Db } = require("./config/db/index");
const errorHandler = require("./middleware/errorHandler");
const responseHandler = require("./middleware/responseHandler");
const i18n = require("./config/i18n");
const routes = require("./apps");
require("colors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(i18n.init);
app.use(responseHandler);

app.use((req, res, next) => {
  if (req.url.startsWith("/ayzek-back")) {
    req.url = req.url.replace("/ayzek-back", "");
  }
  next();
});

// API Routes
app.use("/", routes);

app.use(errorHandler);

app.use("*", async (req, res) => {
  return res.error(req.t("pageNotFound"), 404);
});

const startServer = async () => {
  try {
    await Db.connectDB();

    app.listen(PORT, () => {
      console.info(`Server running on port ${PORT}`.bgBlue);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
