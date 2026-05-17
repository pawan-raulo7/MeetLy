const { Sequelize } =
    require("sequelize");

require("dotenv").config();

let sequelize;

/* =========================================
   PRODUCTION DATABASE
========================================= */

if (
    process.env.NODE_ENV ===
    "production"
) {

    sequelize =
        new Sequelize(
            process.env.MYSQL_PUBLIC_URL,
            {

                dialect: "mysql",

                protocol: "mysql",

                logging: false,
            }
        );

} else {

    /* =========================================
       LOCAL DATABASE
    ========================================= */

    sequelize =
        new Sequelize(

            process.env.DB_NAME,

            process.env.DB_USER,

            process.env.DB_PASSWORD,

            {

                host:
                    process.env.DB_HOST,

                dialect:
                    "mysql",

                logging:
                    process.env.NODE_ENV ===
                        "development"

                        ? console.log

                        : false,
            }
        );
}

module.exports =
    sequelize;