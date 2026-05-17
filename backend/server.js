const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const helmet = require("helmet");

const morgan = require("morgan");

const rateLimit =
    require("express-rate-limit");

const sequelize =
    require("./config/db");

const errorHandler =
    require("./middleware/errorHandler");

/* LOAD ENV */

dotenv.config();

/* LOAD MODELS */

require("./models");

/* ROUTES */

const authRoutes =
    require("./routes/authRoutes");

const meetingRoutes =
    require("./routes/meetingRoutes");

const taskRoutes =
    require("./routes/taskRoutes");

/* APP */

const app = express();

/* =========================================
   MIDDLEWARES
========================================= */

app.use(express.json());

/* SECURITY */

app.use(helmet());

/* RATE LIMITING */

const apiLimiter =
    rateLimit({

        windowMs:
            15 * 60 * 1000,

        max: 100,

        message:
            "Too many requests from this IP, please try again later.",
    });

app.use(
    "/api/",
    apiLimiter
);

/* CORS */

const allowedOrigins =
    process.env.NODE_ENV ===
        "production"

        ? [
            process.env
                .FRONTEND_URL,
        ]

        : [
            "http://localhost:5173",
            "http://localhost:5174",
        ];

app.use(
    cors({

        origin: (
            origin,
            callback
        ) => {

            if (
                !origin ||
                allowedOrigins.includes(
                    origin
                )
            ) {

                callback(
                    null,
                    true
                );

            } else {

                callback(
                    new Error(
                        "Not allowed by CORS"
                    )
                );
            }
        },

        credentials: true,
    })
);

/* LOGGING */

if (
    process.env.NODE_ENV ===
    "development"
) {

    app.use(
        morgan("dev")
    );
}

/* =========================================
   ROUTES
========================================= */

app.get("/", (req, res) => {

    res.status(200).json({
        message:
            "Fabric Flow Backend Running Successfully",
    });
});

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/meetings",
    meetingRoutes
);

app.use(
    "/api/tasks",
    taskRoutes
);

/* =========================================
   ERROR HANDLER
========================================= */

app.use(errorHandler);

/* =========================================
   SERVER
========================================= */

const PORT =
    process.env.PORT || 5000;

/* DATABASE SYNC */

const syncOptions =
    process.env.NODE_ENV ===
        "production"

        ? {}

        : {
            alter: true,
        };

sequelize
    .sync(syncOptions)

    .then(() => {

        console.log(
            "MySQL Database Connected Successfully"
        );

        app.listen(
            PORT,
            () => {

                console.log(
                    `Server running on port ${PORT}`
                );
            }
        );
    })

    .catch((error) => {

        console.error(
            "Database connection failed:"
        );

        console.error(error);

        process.exit(1);
    });