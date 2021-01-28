"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var _default = {
  /**
   * Here you may specify which of the database connections below you wish
   * to use as your default connection for all database work. 
   */
  connection: process.env.DB_CONNECTION,

  /**
   * Here you may specify the host address of database which will be
   * used for connection
   */
  host: process.env.DB_HOST,

  /**
   * Here you may specify the port of database which will be
   * used for connection
   */
  port: process.env.DB_PORT,

  /**
   * Here you may specify the database name of connection which will be
   * used for connection
   */
  database: process.env.DB_DATABASE,

  /**
   * Here you may specify the username of database which will be
   * used for connection
   */
  username: process.env.DB_USERNAME,

  /**
   * Here you may specify the password of database which will be
   * used for connection
   */
  password: process.env.DB_PASSWORD
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvZGIuanMiXSwibmFtZXMiOlsiZG90ZW52IiwiY29uZmlnIiwiY29ubmVjdGlvbiIsInByb2Nlc3MiLCJlbnYiLCJEQl9DT05ORUNUSU9OIiwiaG9zdCIsIkRCX0hPU1QiLCJwb3J0IiwiREJfUE9SVCIsImRhdGFiYXNlIiwiREJfREFUQUJBU0UiLCJ1c2VybmFtZSIsIkRCX1VTRVJOQU1FIiwicGFzc3dvcmQiLCJEQl9QQVNTV09SRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0FBLG1CQUFPQyxNQUFQOztlQUVlO0FBQ2I7QUFDRjtBQUNBO0FBQ0E7QUFDRUMsRUFBQUEsVUFBVSxFQUFFQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsYUFMWDs7QUFPYjtBQUNGO0FBQ0E7QUFDQTtBQUNFQyxFQUFBQSxJQUFJLEVBQUVILE9BQU8sQ0FBQ0MsR0FBUixDQUFZRyxPQVhMOztBQWFiO0FBQ0Y7QUFDQTtBQUNBO0FBQ0VDLEVBQUFBLElBQUksRUFBRUwsT0FBTyxDQUFDQyxHQUFSLENBQVlLLE9BakJMOztBQW1CYjtBQUNGO0FBQ0E7QUFDQTtBQUNFQyxFQUFBQSxRQUFRLEVBQUVQLE9BQU8sQ0FBQ0MsR0FBUixDQUFZTyxXQXZCVDs7QUF5QmI7QUFDRjtBQUNBO0FBQ0E7QUFDRUMsRUFBQUEsUUFBUSxFQUFFVCxPQUFPLENBQUNDLEdBQVIsQ0FBWVMsV0E3QlQ7O0FBZ0NiO0FBQ0Y7QUFDQTtBQUNBO0FBQ0VDLEVBQUFBLFFBQVEsRUFBRVgsT0FBTyxDQUFDQyxHQUFSLENBQVlXO0FBcENULEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5kb3RlbnYuY29uZmlnKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEhlcmUgeW91IG1heSBzcGVjaWZ5IHdoaWNoIG9mIHRoZSBkYXRhYmFzZSBjb25uZWN0aW9ucyBiZWxvdyB5b3Ugd2lzaFxuICAgKiB0byB1c2UgYXMgeW91ciBkZWZhdWx0IGNvbm5lY3Rpb24gZm9yIGFsbCBkYXRhYmFzZSB3b3JrLiBcbiAgICovXG4gIGNvbm5lY3Rpb246IHByb2Nlc3MuZW52LkRCX0NPTk5FQ1RJT04sXG5cbiAgLyoqXG4gICAqIEhlcmUgeW91IG1heSBzcGVjaWZ5IHRoZSBob3N0IGFkZHJlc3Mgb2YgZGF0YWJhc2Ugd2hpY2ggd2lsbCBiZVxuICAgKiB1c2VkIGZvciBjb25uZWN0aW9uXG4gICAqL1xuICBob3N0OiBwcm9jZXNzLmVudi5EQl9IT1NULFxuXG4gIC8qKlxuICAgKiBIZXJlIHlvdSBtYXkgc3BlY2lmeSB0aGUgcG9ydCBvZiBkYXRhYmFzZSB3aGljaCB3aWxsIGJlXG4gICAqIHVzZWQgZm9yIGNvbm5lY3Rpb25cbiAgICovXG4gIHBvcnQ6IHByb2Nlc3MuZW52LkRCX1BPUlQsXG5cbiAgLyoqXG4gICAqIEhlcmUgeW91IG1heSBzcGVjaWZ5IHRoZSBkYXRhYmFzZSBuYW1lIG9mIGNvbm5lY3Rpb24gd2hpY2ggd2lsbCBiZVxuICAgKiB1c2VkIGZvciBjb25uZWN0aW9uXG4gICAqL1xuICBkYXRhYmFzZTogcHJvY2Vzcy5lbnYuREJfREFUQUJBU0UsXG5cbiAgLyoqXG4gICAqIEhlcmUgeW91IG1heSBzcGVjaWZ5IHRoZSB1c2VybmFtZSBvZiBkYXRhYmFzZSB3aGljaCB3aWxsIGJlXG4gICAqIHVzZWQgZm9yIGNvbm5lY3Rpb25cbiAgICovXG4gIHVzZXJuYW1lOiBwcm9jZXNzLmVudi5EQl9VU0VSTkFNRSxcblxuXG4gIC8qKlxuICAgKiBIZXJlIHlvdSBtYXkgc3BlY2lmeSB0aGUgcGFzc3dvcmQgb2YgZGF0YWJhc2Ugd2hpY2ggd2lsbCBiZVxuICAgKiB1c2VkIGZvciBjb25uZWN0aW9uXG4gICAqL1xuICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuREJfUEFTU1dPUkQsXG59XG4iXX0=