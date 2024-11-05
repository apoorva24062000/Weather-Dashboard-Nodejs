module.exports = {
    port: process.env.PORT || 3000,
    pgUser: process.env.PGUSER || "postgres",
    pgHost: process.env.PGHOST || "localhost",
    pgDatabase: process.env.PGDATABASE || "WeatherMangement",
    pgPassword: process.env.PGPASSWORD || "12345",
    pgPort: process.env.PGPORT || 5432,
    HTTP_OK: 200,
    HTTP_CREATED: 201,
    HTTP_INTERNAL_SERVER_ERROR: 500,
    HTTP_NOT_FOUND: 404,
    HTTP_BAD_REQUEST: 400,
    HTTP_UNAUTHORIZED: 401,
    KEY: "pp",
    TIME: "1h",
    LOG_FILE_MAX_SIZE: "10m",
  LOG_FILE_DELETE_DAYS: "14",


}