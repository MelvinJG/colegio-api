import mysql from "promise-mysql";
import * as dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST,//"localhost",
  user: "root",
  password: "melvin",
  database: "db_colegio_monte_sinai"
  // database: process.env.DATABASE,
});
// const pool = mysql.createPool({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

pool.getConnection().then((connection) => {
  pool.releaseConnection(connection);
  console.log("Connected to MYSQL");
});

// exportamos la conexion
export default pool;
