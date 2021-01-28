"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.deleteUser = exports.getUsers = exports.updateProfile = exports.getUser = exports.register = exports.signIn = exports.seedUsers = exports.topSellers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _models = require("../models");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _data = _interopRequireDefault(require("../data"));

var _utils = require("../utils.js");

var topSellers = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var topSellers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models.db.User.findAll({
              where: {
                isSeller: true
              },
              include: 'seller',
              order: [['seller.rating', 'desc']]
            });

          case 2:
            topSellers = _context.sent;
            res.send({
              topSellers: topSellers
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
exports.topSellers = topSellers;
var seedUsers = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var createdUsers;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models.db.User.bulkCreate(_data["default"].users);

          case 2:
            createdUsers = _context2.sent;
            res.send({
              createdUsers: createdUsers
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
exports.seedUsers = seedUsers;
var signIn = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.db.User.findOne({
              where: {
                email: req.body.email
              }
            });

          case 2:
            user = _context3.sent;

            if (!user) {
              _context3.next = 7;
              break;
            }

            if (!_bcryptjs["default"].compareSync(req.body.password, user.password)) {
              _context3.next = 7;
              break;
            }

            res.send({
              id: user.id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              token: (0, _utils.generateToken)(user)
            });
            return _context3.abrupt("return");

          case 7:
            res.status(401).send({
              message: 'Invalid email or password'
            });

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
exports.signIn = signIn;
var register = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var createdUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.db.User.create({
              name: req.body.name,
              email: req.body.email,
              password: _bcryptjs["default"].hashSync(req.body.password, 8)
            });

          case 2:
            createdUser = _context4.sent;
            res.send({
              id: createdUser.id,
              name: createdUser.name,
              email: createdUser.email,
              isAdmin: createdUser.isAdmin,
              token: (0, _utils.generateToken)(createdUser)
            });
            return _context4.abrupt("return");

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
exports.register = register;
var getUser = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _models.db.User.findByPk(req.params.id);

          case 2:
            user = _context5.sent;

            if (user) {
              res.send(user);
            } else {
              res.status(404).send({
                message: 'User Not Fount'
              });
            }

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
exports.getUser = getUser;
var updateProfile = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var user, updatedUser;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _models.db.User.findByPk(req.user.id);

          case 2:
            user = _context6.sent;

            if (!user) {
              _context6.next = 11;
              break;
            }

            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
              user.password = _bcryptjs["default"].hashSync(req.body.password, 8);
            }

            _context6.next = 9;
            return user.save();

          case 9:
            updatedUser = _context6.sent;
            res.send({
              id: updatedUser.id,
              name: updatedUser.name,
              email: updatedUser.email,
              isAdmin: updatedUser.isAdmin,
              token: (0, _utils.generateToken)(updatedUser)
            });

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
exports.updateProfile = updateProfile;
var getUsers = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var users;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _models.db.User.findAll();

          case 2:
            users = _context7.sent;
            res.send(users);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
exports.getUsers = getUsers;
var deleteUser = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var user, deletedUser;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _models.db.User.findByPk(req.params.id);

          case 2:
            user = _context8.sent;

            if (!user) {
              _context8.next = 13;
              break;
            }

            if (!(user.email === 'admin@gmail.com')) {
              _context8.next = 7;
              break;
            }

            res.status(400).send({
              message: 'Can not delete Admin User'
            });
            return _context8.abrupt("return");

          case 7:
            _context8.next = 9;
            return user.destroy();

          case 9:
            deletedUser = _context8.sent;
            res.send({
              message: 'User Deleted',
              user: deletedUser
            });
            _context8.next = 14;
            break;

          case 13:
            res.status(404).send({
              message: 'User Not Found'
            });

          case 14:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
exports.deleteUser = deleteUser;
var updateUser = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var user, updatedUser;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _models.db.User.findByPk(req.params.id);

          case 2:
            user = _context9.sent;

            if (!user) {
              _context9.next = 13;
              break;
            }

            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isAdmin = Boolean(req.body.isAdmin);
            _context9.next = 9;
            return user.save();

          case 9:
            updatedUser = _context9.sent;
            res.send({
              message: 'User Updated',
              user: updatedUser
            });
            _context9.next = 14;
            break;

          case 13:
            res.status(404).send({
              message: 'User Not Found'
            });

          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
exports.updateUser = updateUser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy91c2VyQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJ0b3BTZWxsZXJzIiwicmVxIiwicmVzIiwiZGIiLCJVc2VyIiwiZmluZEFsbCIsIndoZXJlIiwiaXNTZWxsZXIiLCJpbmNsdWRlIiwib3JkZXIiLCJzZW5kIiwic2VlZFVzZXJzIiwiYnVsa0NyZWF0ZSIsImRhdGEiLCJ1c2VycyIsImNyZWF0ZWRVc2VycyIsInNpZ25JbiIsImZpbmRPbmUiLCJlbWFpbCIsImJvZHkiLCJ1c2VyIiwiYmNyeXB0IiwiY29tcGFyZVN5bmMiLCJwYXNzd29yZCIsImlkIiwibmFtZSIsImlzQWRtaW4iLCJ0b2tlbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJyZWdpc3RlciIsImNyZWF0ZSIsImhhc2hTeW5jIiwiY3JlYXRlZFVzZXIiLCJnZXRVc2VyIiwiZmluZEJ5UGsiLCJwYXJhbXMiLCJ1cGRhdGVQcm9maWxlIiwic2F2ZSIsInVwZGF0ZWRVc2VyIiwiZ2V0VXNlcnMiLCJkZWxldGVVc2VyIiwiZGVzdHJveSIsImRlbGV0ZWRVc2VyIiwidXBkYXRlVXNlciIsIkJvb2xlYW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFTyxJQUFNQSxVQUFVLEdBQUc7QUFBQSwyRkFBYSxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ1ZDLFdBQUdDLElBQUgsQ0FBUUMsT0FBUixDQUFnQjtBQUNyQ0MsY0FBQUEsS0FBSyxFQUFFO0FBQUVDLGdCQUFBQSxRQUFRLEVBQUU7QUFBWixlQUQ4QjtBQUVyQ0MsY0FBQUEsT0FBTyxFQUFFLFFBRjRCO0FBR3JDQyxjQUFBQSxLQUFLLEVBQUUsQ0FDSCxDQUFDLGVBQUQsRUFBa0IsTUFBbEIsQ0FERztBQUg4QixhQUFoQixDQURVOztBQUFBO0FBQzdCVCxZQUFBQSxVQUQ2QjtBQVFuQ0Us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QkEsWUFBQUEsSUFBSSxDQUFDSyxJQUFMLEdBQVl4QixHQUFHLENBQUNrQixJQUFKLENBQVNNLElBQVQsSUFBaUJMLElBQUksQ0FBQ0ssSUFBbEM7QUFDQUwsWUFBQUEsSUFBSSxDQUFDRixLQUFMLEdBQWFqQixHQUFHLENBQUNrQixJQUFKLENBQVNELEtBQVQsSUFBa0JFLElBQUksQ0FBQ0YsS0FBcEM7QUFDQUUsWUFBQUEsSUFBSSxDQUFDTSxPQUFMLEdBQWVtQixPQUFPLENBQUM1QyxHQUFHLENBQUNrQixJQUFKLENBQVNPLE9BQVYsQ0FBdEI7QUFMK0I7QUFBQSxtQkFNTE4sSUFBSSxDQUFDa0IsSUFBTCxFQU5LOztBQUFBO0FBTXpCQyxZQUFBQSxXQU55QjtBQU8vQnJDLFlBQUFBLEdBQUcsQ0FBQ1EsSUFBSixDQUFTO0FBQUVtQixjQUFBQSxPQUFPLEVBQUUsY0FBWDtBQUEyQlQsY0FBQUEsSUFBSSxFQUFFbUI7QUFBakMsYUFBVDtBQVArQjtBQUFBOztBQUFBO0FBUy9CckMsWUFBQUEsR0FBRyxDQUFDMEIsTUFBSixDQUFXLEdBQVgsRUFBZ0JsQixJQUFoQixDQUFxQjtBQUFFbUIsY0FBQUEsT0FBTyxFQUFFO0FBQVgsYUFBckI7O0FBVCtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXN5bmNIYW5kbGVyIGZyb20gXCJleHByZXNzLWFzeW5jLWhhbmRsZXJcIjtcclxuaW1wb3J0IHsgZGIgfSBmcm9tICcuLi9tb2RlbHMnO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcclxuaW1wb3J0IGRhdGEgZnJvbSAnLi4vZGF0YSc7XHJcbmltcG9ydCB7IGdlbmVyYXRlVG9rZW4gfSBmcm9tICcuLi91dGlscy5qcyc7XHJcblxyXG5leHBvcnQgY29uc3QgdG9wU2VsbGVycyA9IGFzeW5jSGFuZGxlcihhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGNvbnN0IHRvcFNlbGxlcnMgPSBhd2FpdCBkYi5Vc2VyLmZpbmRBbGwoe1xyXG4gICAgICAgIHdoZXJlOiB7IGlzU2VsbGVyOiB0cnVlIH0sXHJcbiAgICAgICAgaW5jbHVkZTogJ3NlbGxlcicsXHJcbiAgICAgICAgb3JkZXI6IFtcclxuICAgICAgICAgICAgWydzZWxsZXIucmF0aW5nJywgJ2Rlc2MnXVxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgcmVzLnNlbmQoeyB0b3BTZWxsZXJzIH0pO1xyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZWVkVXNlcnMgPSBhc3luY0hhbmRsZXIoYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBjb25zdCBjcmVhdGVkVXNlcnMgPSBhd2FpdCBkYi5Vc2VyLmJ1bGtDcmVhdGUoZGF0YS51c2Vycyk7XHJcbiAgICByZXMuc2VuZCh7IGNyZWF0ZWRVc2VycyB9KTtcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3Qgc2lnbkluID0gYXN5bmNIYW5kbGVyKGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGRiLlVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiByZXEuYm9keS5lbWFpbCB9IH0pO1xyXG4gICAgaWYgKHVzZXIpIHtcclxuICAgICAgICBpZiAoYmNyeXB0LmNvbXBhcmVTeW5jKHJlcS5ib2R5LnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKSkge1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7XHJcbiAgICAgICAgICAgICAgICBpZDogdXNlci5pZCxcclxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgaXNBZG1pbjogdXNlci5pc0FkbWluLFxyXG4gICAgICAgICAgICAgICAgdG9rZW46IGdlbmVyYXRlVG9rZW4odXNlciksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoeyBtZXNzYWdlOiAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCcgfSk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyID0gYXN5bmNIYW5kbGVyKGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgY29uc3QgY3JlYXRlZFVzZXIgPSBhd2FpdCBkYi5Vc2VyLmNyZWF0ZSh7XHJcbiAgICAgICAgbmFtZTogcmVxLmJvZHkubmFtZSxcclxuICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWwsXHJcbiAgICAgICAgcGFzc3dvcmQ6IGJjcnlwdC5oYXNoU3luYyhyZXEuYm9keS5wYXNzd29yZCwgOCksXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXMuc2VuZCh7XHJcbiAgICAgICAgaWQ6IGNyZWF0ZWRVc2VyLmlkLFxyXG4gICAgICAgIG5hbWU6IGNyZWF0ZWRVc2VyLm5hbWUsXHJcbiAgICAgICAgZW1haWw6IGNyZWF0ZWRVc2VyLmVtYWlsLFxyXG4gICAgICAgIGlzQWRtaW46IGNyZWF0ZWRVc2VyLmlzQWRtaW4sXHJcbiAgICAgICAgdG9rZW46IGdlbmVyYXRlVG9rZW4oY3JlYXRlZFVzZXIpLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm47XHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFVzZXIgPSBhc3luY0hhbmRsZXIoYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgZGIuVXNlci5maW5kQnlQayhyZXEucGFyYW1zLmlkKTtcclxuICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgcmVzLnNlbmQodXNlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHsgbWVzc2FnZTogJ1VzZXIgTm90IEZvdW50JyB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlUHJvZmlsZSA9IGFzeW5jSGFuZGxlcihhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBkYi5Vc2VyLmZpbmRCeVBrKHJlcS51c2VyLmlkKTtcclxuICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgdXNlci5uYW1lID0gcmVxLmJvZHkubmFtZSB8fCB1c2VyLm5hbWU7XHJcbiAgICAgICAgdXNlci5lbWFpbCA9IHJlcS5ib2R5LmVtYWlsIHx8IHVzZXIuZW1haWw7XHJcbiAgICAgICAgaWYgKHJlcS5ib2R5LnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgIHVzZXIucGFzc3dvcmQgPSBiY3J5cHQuaGFzaFN5bmMocmVxLmJvZHkucGFzc3dvcmQsIDgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB1cGRhdGVkVXNlciA9IGF3YWl0IHVzZXIuc2F2ZSgpO1xyXG4gICAgICAgIHJlcy5zZW5kKHtcclxuICAgICAgICAgICAgaWQ6IHVwZGF0ZWRVc2VyLmlkLFxyXG4gICAgICAgICAgICBuYW1lOiB1cGRhdGVkVXNlci5uYW1lLFxyXG4gICAgICAgICAgICBlbWFpbDogdXBkYXRlZFVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIGlzQWRtaW46IHVwZGF0ZWRVc2VyLmlzQWRtaW4sXHJcbiAgICAgICAgICAgIHRva2VuOiBnZW5lcmF0ZVRva2VuKHVwZGF0ZWRVc2VyKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VXNlcnMgPSBhc3luY0hhbmRsZXIoYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBjb25zdCB1c2VycyA9IGF3YWl0IGRiLlVzZXIuZmluZEFsbCgpO1xyXG4gICAgcmVzLnNlbmQodXNlcnMpO1xyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVVc2VyID0gYXN5bmNIYW5kbGVyKGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGRiLlVzZXIuZmluZEJ5UGsocmVxLnBhcmFtcy5pZCk7XHJcbiAgICBpZiAodXNlcikge1xyXG4gICAgICAgIGlmICh1c2VyLmVtYWlsID09PSAnYWRtaW5AZ21haWwuY29tJykge1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IG1lc3NhZ2U6ICdDYW4gbm90IGRlbGV0ZSBBZG1pbiBVc2VyJyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZWxldGVkVXNlciA9IGF3YWl0IHVzZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIHJlcy5zZW5kKHsgbWVzc2FnZTogJ1VzZXIgRGVsZXRlZCcsIHVzZXI6IGRlbGV0ZWRVc2VyIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwNCkuc2VuZCh7IG1lc3NhZ2U6ICdVc2VyIE5vdCBGb3VuZCcgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVVzZXIgPSBhc3luY0hhbmRsZXIoYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgZGIuVXNlci5maW5kQnlQayhyZXEucGFyYW1zLmlkKTtcclxuICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgdXNlci5uYW1lID0gcmVxLmJvZHkubmFtZSB8fCB1c2VyLm5hbWU7XHJcbiAgICAgICAgdXNlci5lbWFpbCA9IHJlcS5ib2R5LmVtYWlsIHx8IHVzZXIuZW1haWw7XHJcbiAgICAgICAgdXNlci5pc0FkbWluID0gQm9vbGVhbihyZXEuYm9keS5pc0FkbWluKTtcclxuICAgICAgICBjb25zdCB1cGRhdGVkVXNlciA9IGF3YWl0IHVzZXIuc2F2ZSgpO1xyXG4gICAgICAgIHJlcy5zZW5kKHsgbWVzc2FnZTogJ1VzZXIgVXBkYXRlZCcsIHVzZXI6IHVwZGF0ZWRVc2VyIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwNCkuc2VuZCh7IG1lc3NhZ2U6ICdVc2VyIE5vdCBGb3VuZCcgfSk7XHJcbiAgICB9XHJcbn0pOyJdfQ==