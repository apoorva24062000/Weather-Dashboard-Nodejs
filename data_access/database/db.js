/**
 * Project Name : Weather Mangement System
 
 * @author Apoorva Singh
 * @date Feb 21, 2024


/**
 * @fileoverview PostgreSQL Database Connection
 * @description Creates a connection pool to PostgreSQL using the provided global settings.
 * -----------------------------------------------------------------------------------
 * Dependencies:
 * - pg: PostgreSQL client for Node.js.
 * -----------------------------------------------------------------------------------
 * * Revision History
* -----------------------------------------------------------------------------------
* Modified By          Modified On         Description
* Apoorva Singh       Feb 21,2024           Initially created

* -----------------------------------------------------------------------------------
*/

const { Pool } = require("pg");

const pool = new Pool({
  user: global.settings.pgUser,
  host: global.settings.pgHost,
  database: global.settings.pgDatabase,
  password: global.settings.pgPassword,
  port: global.settings.pgPort,
});

module.exports = pool;