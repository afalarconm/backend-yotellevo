require('dotenv').config();

const config = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE || 'database_test',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }

    }
}
};

Object.keys(config).forEach(configkey) => {
    const configValue = config[configkey];
    if (configValue.extend) {
        config[configkey] = { ...config[configValue.extend], ...configValue };
    }
};

module.exports = config;

