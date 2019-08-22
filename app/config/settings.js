require('dotenv').config();

const appName = 'Mock Premier League API';

const config = {
  app_name: appName,
  delimiter: ':\n',
  secret: 'weMove',
  admin_check: 'macandcheese',
  api_server: {
    port: process.env.API_PORT,
  },
  logging: {
    shouldLogToFile: process.env.ENABLE_FILE_LOGGING,
    file: process.env.LOG_PATH,
    level: process.env.LOG_LEVEL || 'warn',
    console: process.env.LOG_ENABLE_CONSOLE || true,
  },
  mongodb: {
    host: process.env.MONGO_HOST,
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    port: process.env.MONGO_PORT,
    db: process.env.MONGO_DB_NAME,
    collections: {
      users: 'users',
      team: 'team',
      fixtures: 'fixtures'
    },
    query_limit: process.env.MONGODB_QUERY_LIMIT,
  },
  mongo_error_code: {
    duplicate_id: 11000
  },
};

module.exports = config;
