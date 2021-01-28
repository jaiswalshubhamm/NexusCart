"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _express = require("express");

var _utils = require("../utils");

var uploadRouter = (0, _express.Router)();

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), ".jpg"));
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
uploadRouter.post('/', _utils.isAuth, upload.single('image'), function (req, res) {
  res.send("/".concat(req.file.path));
});
var _default = uploadRouter;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXJzL3VwbG9hZFJvdXRlci5qcyJdLCJuYW1lcyI6WyJ1cGxvYWRSb3V0ZXIiLCJzdG9yYWdlIiwibXVsdGVyIiwiZGlza1N0b3JhZ2UiLCJkZXN0aW5hdGlvbiIsInJlcSIsImZpbGUiLCJjYiIsImZpbGVuYW1lIiwiRGF0ZSIsIm5vdyIsInVwbG9hZCIsInBvc3QiLCJpc0F1dGgiLCJzaW5nbGUiLCJyZXMiLCJzZW5kIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBTUEsWUFBWSxHQUFHLHNCQUFyQjs7QUFFQSxJQUFNQyxPQUFPLEdBQUdDLG1CQUFPQyxXQUFQLENBQW1CO0FBQy9CQyxFQUFBQSxXQUQrQix1QkFDbkJDLEdBRG1CLEVBQ2RDLElBRGMsRUFDUkMsRUFEUSxFQUNKO0FBQ3ZCQSxJQUFBQSxFQUFFLENBQUMsSUFBRCxFQUFPLFVBQVAsQ0FBRjtBQUNILEdBSDhCO0FBSS9CQyxFQUFBQSxRQUorQixvQkFJdEJILEdBSnNCLEVBSWpCQyxJQUppQixFQUlYQyxFQUpXLEVBSVA7QUFDcEJBLElBQUFBLEVBQUUsQ0FBQyxJQUFELFlBQVVFLElBQUksQ0FBQ0MsR0FBTCxFQUFWLFVBQUY7QUFDSDtBQU44QixDQUFuQixDQUFoQjs7QUFTQSxJQUFNQyxNQUFNLEdBQUcsd0JBQU87QUFBRVYsRUFBQUEsT0FBTyxFQUFQQTtBQUFGLENBQVAsQ0FBZjtBQUVBRCxZQUFZLENBQUNZLElBQWIsQ0FBa0IsR0FBbEIsRUFBdUJDLGFBQXZCLEVBQStCRixNQUFNLENBQUNHLE1BQVAsQ0FBYyxPQUFkLENBQS9CLEVBQXVELFVBQUNULEdBQUQsRUFBTVUsR0FBTixFQUFjO0FBQ2pFQSxFQUFBQSxHQUFHLENBQUNDLElBQUosWUFBYVgsR0FBRyxDQUFDQyxJQUFKLENBQVNXLElBQXRCO0FBQ0gsQ0FGRDtlQUllakIsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtdWx0ZXIgZnJvbSAnbXVsdGVyJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7IGlzQXV0aCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmNvbnN0IHVwbG9hZFJvdXRlciA9IFJvdXRlcigpO1xyXG5cclxuY29uc3Qgc3RvcmFnZSA9IG11bHRlci5kaXNrU3RvcmFnZSh7XHJcbiAgICBkZXN0aW5hdGlvbihyZXEsIGZpbGUsIGNiKSB7XHJcbiAgICAgICAgY2IobnVsbCwgJ3VwbG9hZHMvJyk7XHJcbiAgICB9LFxyXG4gICAgZmlsZW5hbWUocmVxLCBmaWxlLCBjYikge1xyXG4gICAgICAgIGNiKG51bGwsIGAke0RhdGUubm93KCl9LmpwZ2ApO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG5jb25zdCB1cGxvYWQgPSBtdWx0ZXIoeyBzdG9yYWdlIH0pO1xyXG5cclxudXBsb2FkUm91dGVyLnBvc3QoJy8nLCBpc0F1dGgsIHVwbG9hZC5zaW5nbGUoJ2ltYWdlJyksIChyZXEsIHJlcykgPT4ge1xyXG4gICAgcmVzLnNlbmQoYC8ke3JlcS5maWxlLnBhdGh9YCk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXBsb2FkUm91dGVyOyJdfQ==