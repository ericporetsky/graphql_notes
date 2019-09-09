
require('dotenv').config()


const development = {
  username: process.env.DEV_DB_USERNAME,
  password: null,
  database: process.env.DEV_DB_NAME,
  host: process.env.DEV_DB_HOST,
  dialect: 'postgres'
}

const production = {
  username: process.env.PROD_DB_USERNAME,
  password: process.env.PROD_DB_PASSWORD,
  database: process.env.PROD_DB_NAME,
  host: process.env.PROD_DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: "true",
    sslfactory: "org.postgresql.ssl.NonValidatingFactory"
  }

}

module.exports = {
  development: development,
  production: production
}