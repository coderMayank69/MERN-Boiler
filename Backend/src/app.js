const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const morgan = require("morgan");
const apiRoutes = require("./routes");
const { errorHandler, notFoundHandler } = require("./middlewares/error.middleware");
const { corsOptions } = require("./config/cors");

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 200,
        standardHeaders: "draft-8",
        legacyHeaders: false,
    })
);
app.use(hpp());
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
}

app.get("/", (_req, res) => {
    res.status(200).json({
        message: "MERN boilerplate backend is running",
    });
});

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
