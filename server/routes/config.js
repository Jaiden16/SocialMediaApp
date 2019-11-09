const pgp = require('pg-promise')();
const connesctionString = "postgress://localhost:5432/lurk_db";
const db = pgp(connesctionString);

module.exports = db