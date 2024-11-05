const path = require("path");
const winston = require("winston");
require("winston-daily-rotate-file");
const logFileName = "Weather Mangement System";
const logFileExtension = ".log";
const logDirectory = global.path.resolve(global.appBasePath, "logs");
const dateFormat = "YYYY-MM-DD";
const logType = "Analysis";
const threadName = "";
const threadNumber = 1;
const increment_value = 1;
let filteredStack;
let loggerFileName = "";
let loggerFunctionName = "";
let loggerLineNumber = "";

// Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss.SSS"
  }),
  winston.format.printf(
    (info) =>
      `${info.timestamp},${info.level.toUpperCase()},${info.message}`
  )
);

const transport = new winston.transports.DailyRotateFile({
  filename: "%DATE%-" + logFileName,
  dirname: logDirectory,
  datePattern: dateFormat,
  zippedArchive: false,
  maxSize: global.settings.LOG_FILE_MAX_SIZE,
  maxFiles: global.settings.LOGS_DELETE_LIMIT,
  extension: logFileExtension,
  handleExceptions: true
});

// Creating logger instance
const logger = winston.createLogger({
  format: logFormat,
  transports: [
    transport
  ],
  level: 'debug' // Setting log level to include 'debug' messages
});


/**
 * utils/WinstonLogger
 * @module
 */
module.exports = {
  /**
   * Function to fetch the FileName, FunctionName and LineNumber corresponding to the call and log in the required format
   * @param {string} level - error, info, debug
   * @param {string} message
   */
  Log: (level, message) => {
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
      return stack;
    };
    var err = new Error();
    let filteredStack = err.stack.filter(
      (element) =>
        element.getFileName() != null &&
        !(
          element.getFileName().includes("node:internal") &&
          element.getFileName().includes("node_modules")
        )
    );

    let i = 1; // Used to refer to first index of the filteredStack as the details of the calling function are present on the first index

    Error.prepareStackTrace = orig;
    let loggerFileName = path.basename(filteredStack[i].getFileName());
    let loggerLineNumber = filteredStack[i].getLineNumber();

    let loggerFunctionName =
      filteredStack[i].getFunctionName() != null
        ? filteredStack[i].getFunctionName()
        : filteredStack[i + increment_value].getFunctionName();
    message = `${loggerFileName},${loggerFunctionName},${loggerLineNumber},${message}`;
    // Generating log
    logger.log(level, message);
  }
};