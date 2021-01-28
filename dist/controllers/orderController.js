"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDeliveryStatus = exports.deleteOrder = exports.updatePayStatus = exports.getOrder = exports.createOrder = exports.getMineOrder = exports.getOrders = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _models = require("../models");

var getOrders = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var orders;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models.db.Order.findAll({
              include: [{
                model: _models.db.User,
                as: 'user'
              }]
            });

          case 2:
            orders = _context.sent;
            res.send(orders);

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
exports.getOrders = getOrders;
var getMineOrder = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var orders;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models.db.Order.findAll({
              where: {
                userId: req.user.id
              }
            });

          case 2:
            orders = _context2.sent;
            res.send(orders);

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
exports.getMineOrder = getMineOrder;
var createOrder = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var createdOrder;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(req.body.orderItems.length === 0)) {
              _context3.next = 4;
              break;
            }

            res.status(400).send({
              message: 'Cart is empty'
            });
            _context3.next = 8;
            break;

          case 4:
            _context3.next = 6;
            return _models.db.Order.create({
              userId: req.user.id,
              itemsPrice: req.body.itemsPrice,
              shippingPrice: req.body.shippingPrice,
              taxPrice: req.body.taxPrice,
              totalPrice: req.body.totalPrice,
              paymentMethod: req.body.paymentMethod,
              shippingName: req.body.shippingAddress.fullName,
              shippingAddress: req.body.shippingAddress.address,
              shippingCity: req.body.shippingAddress.city,
              shippingPostalCode: req.body.shippingAddress.postalCode,
              shippingCountry: req.body.shippingAddress.country,
              shippingLat: req.body.shippingAddress.lat,
              shippingLong: req.body.shippingAddress["long"],
              orderItems: req.body.orderItems
            }, {
              include: [{
                model: _models.db.OrderItem,
                as: 'orderItems'
              }]
            });

          case 6:
            createdOrder = _context3.sent;
            res.status(201).send({
              message: 'New Order Created',
              order: createdOrder
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
exports.createOrder = createOrder;
var getOrder = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var order;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.db.Order.findOne({
              where: {
                id: req.params.id
              },
              include: [{
                model: _models.db.OrderItem,
                as: 'orderItems'
              }]
            });

          case 2:
            order = _context4.sent;

            if (order) {
              res.send(order);
            } else {
              res.status(404).send({
                message: 'Order Not Found'
              });
            }

          case 4:
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
exports.getOrder = getOrder;
var updatePayStatus = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var order, updatedOrder;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _models.db.Order.findByPk(req.params.id);

          case 2:
            order = _context5.sent;

            if (!order) {
              _context5.next = 16;
              break;
            }

            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentId = req.body.id;
            order.paymentStatus = req.body.status;
            order.paymentUpdateTime = req.body.update_time;
            order.paymentEmail = req.body.paymentEmail;
            _context5.next = 12;
            return order.save();

          case 12:
            updatedOrder = _context5.sent;
            res.send({
              message: 'Order Paid',
              order: updatedOrder
            });
            _context5.next = 17;
            break;

          case 16:
            res.status(404).send({
              message: 'Order Not Found'
            });

          case 17:
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
exports.updatePayStatus = updatePayStatus;
var deleteOrder = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var order, _deleteOrder;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _models.db.Order.findByPk(req.params.id);

          case 2:
            order = _context6.sent;

            if (!order) {
              _context6.next = 10;
              break;
            }

            _context6.next = 6;
            return order.destroy();

          case 6:
            _deleteOrder = _context6.sent;
            res.send({
              message: 'Order Deleted',
              order: _deleteOrder
            });
            _context6.next = 11;
            break;

          case 10:
            res.status(404).send({
              message: 'Order Not Found'
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
exports.deleteOrder = deleteOrder;
var updateDeliveryStatus = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var order, updatedOrder;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _models.db.Order.findByPk(req.params.id);

          case 2:
            order = _context7.sent;

            if (!order) {
              _context7.next = 12;
              break;
            }

            order.isDelivered = true;
            order.deliveredAt = Date.now();
            _context7.next = 8;
            return order.save();

          case 8:
            updatedOrder = _context7.sent;
            res.send({
              message: 'Order Delivered',
              order: updatedOrder
            });
            _context7.next = 13;
            break;

          case 12:
            res.status(404).send({
              message: 'Order Not Found'
            });

          case 13:
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
exports.updateDeliveryStatus = updateDeliveryStatus;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9vcmRlckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiZ2V0T3JkZXJzIiwicmVxIiwicmVzIiwiZGIiLCJPcmRlciIsImZpbmRBbGwiLCJpbmNsdWRlIiwibW9kZWwiLCJVc2VyIiwiYXMiLCJvcmRlcnMiLCJzZW5kIiwiZ2V0TWluZU9yZGVyIiwid2hlcmUiLCJ1c2VySWQiLCJ1c2VyIiwiaWQiLCJjcmVhdGVPcmRlciIsImJvZHkiLCJvcmRlckl0ZW1zIiwibGVuZ3RoIiwic3RhdHVzIiwibWVzc2FnZSIsImNyZWF0ZSIsIml0ZW1zUHJpY2UiLCJzaGlwcGluZ1ByaWNlIiwidGF4UHJpY2UiLCJ0b3RhbFByaWNlIiwicGF5bWVudE1ldGhvZCIsInNoaXBwaW5nTmFtZSIsInNoaXBwaW5nQWRkcmVzcyIsImZ1bGxOYW1lIiwiYWRkcmVzcyIsInNoaXBwaW5nQ2l0eSIsImNpdHkiLCJzaGlwcGluZ1Bvc3RhbENvZGUiLCJwb3N0YWxDb2RlIiwic2hpcHBpbmdDb3VudHJ5IiwiY291bnRyeSIsInNoaXBwaW5nTGF0IiwibGF0Iiwic2hpcHBpbmdMb25nIiwiT3JkZXJJdGVtIiwiY3JlYXRlZE9yZGVyIiwib3JkZXIiLCJnZXRPcmRlciIsImZpbmRPbmUiLCJwYXJhbXMiLCJ1cGRhdGVQYXlTdGF0dXMiLCJmaW5kQnlQayIsImlzUGFpZCIsInBhaWRBdCIsIkRhdGUiLCJub3ciLCJwYXltZW50SWQiLCJwYXltZW50U3RhdHVzIiwicGF5bWVudFVwZGF0ZVRpbWUiLCJ1cGRhdGVfdGltZSIsInBheW1lbnRFbWFpbCIsInNhdmUiLCJ1cGRhdGVkT3JkZXIiLCJkZWxldGVPcmRlciIsImRlc3Ryb3kiLCJ1cGRhdGVEZWxpdmVyeVN0YXR1cyIsImlzRGVsaXZlcmVkIiwiZGVsaXZlcmVkQXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFTyxJQUFNQSxTQUFTLEdBQUc7QUFBQSwyRkFBYSxpQkFB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QUE7QUFBQTtBQUFBOztBQUd6Q0EsWUFBQUEsS0FBSyxDQUFDb0IsV0FBTixHQUFvQixJQUFwQjtBQUNBcEIsWUFBQUEsS0FBSyxDQUFDcUIsV0FBTixHQUFvQmIsSUFBSSxDQUFDQyxHQUFMLEVBQXBCO0FBSnlDO0FBQUEsbUJBTWRULEtBQUssQ0FBQ2UsSUFBTixFQU5jOztBQUFBO0FBTW5DQyxZQUFBQSxZQU5tQztBQU96QzFELFlBQUFBLEdBQUcsQ0FBQ1MsSUFBSixDQUFTO0FBQUVXLGNBQUFBLE9BQU8sRUFBRSxpQkFBWDtBQUE4QnNCLGNBQUFBLEtBQUssRUFBRWdCO0FBQXJDLGFBQVQ7QUFQeUM7QUFBQTs7QUFBQTtBQVN6QzFELFlBQUFBLEdBQUcsQ0FBQ21CLE1BQUosQ0FBVyxHQUFYLEVBQWdCVixJQUFoQixDQUFxQjtBQUFFVyxjQUFBQSxPQUFPLEVBQUU7QUFBWCxhQUFyQjs7QUFUeUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBYjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUE3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3luY0hhbmRsZXIgZnJvbSBcImV4cHJlc3MtYXN5bmMtaGFuZGxlclwiO1xyXG5pbXBvcnQgeyBkYiB9IGZyb20gJy4uL21vZGVscyc7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0T3JkZXJzID0gYXN5bmNIYW5kbGVyKGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgY29uc3Qgb3JkZXJzID0gYXdhaXQgZGIuT3JkZXIuZmluZEFsbCh7XHJcbiAgICAgICAgaW5jbHVkZTogW3tcclxuICAgICAgICAgICAgbW9kZWw6IGRiLlVzZXIsXHJcbiAgICAgICAgICAgIGFzOiAndXNlcicsXHJcbiAgICAgICAgfV0sXHJcbiAgICB9KTtcclxuICAgIHJlcy5zZW5kKG9yZGVycyk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE1pbmVPcmRlciA9IGFzeW5jSGFuZGxlcihhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGNvbnN0IG9yZGVycyA9IGF3YWl0IGRiLk9yZGVyLmZpbmRBbGwoeyB3aGVyZTogeyB1c2VySWQ6IHJlcS51c2VyLmlkIH0gfSk7XHJcbiAgICByZXMuc2VuZChvcmRlcnMpO1xyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVPcmRlciA9IGFzeW5jSGFuZGxlcihhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGlmIChyZXEuYm9keS5vcmRlckl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgbWVzc2FnZTogJ0NhcnQgaXMgZW1wdHknIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBjcmVhdGVkT3JkZXIgPSBhd2FpdCBkYi5PcmRlci5jcmVhdGUoe1xyXG4gICAgICAgICAgICB1c2VySWQ6IHJlcS51c2VyLmlkLFxyXG4gICAgICAgICAgICBpdGVtc1ByaWNlOiByZXEuYm9keS5pdGVtc1ByaWNlLFxyXG4gICAgICAgICAgICBzaGlwcGluZ1ByaWNlOiByZXEuYm9keS5zaGlwcGluZ1ByaWNlLFxyXG4gICAgICAgICAgICB0YXhQcmljZTogcmVxLmJvZHkudGF4UHJpY2UsXHJcbiAgICAgICAgICAgIHRvdGFsUHJpY2U6IHJlcS5ib2R5LnRvdGFsUHJpY2UsXHJcbiAgICAgICAgICAgIHBheW1lbnRNZXRob2Q6IHJlcS5ib2R5LnBheW1lbnRNZXRob2QsXHJcbiAgICAgICAgICAgIHNoaXBwaW5nTmFtZTogcmVxLmJvZHkuc2hpcHBpbmdBZGRyZXNzLmZ1bGxOYW1lLFxyXG4gICAgICAgICAgICBzaGlwcGluZ0FkZHJlc3M6IHJlcS5ib2R5LnNoaXBwaW5nQWRkcmVzcy5hZGRyZXNzLFxyXG4gICAgICAgICAgICBzaGlwcGluZ0NpdHk6IHJlcS5ib2R5LnNoaXBwaW5nQWRkcmVzcy5jaXR5LFxyXG4gICAgICAgICAgICBzaGlwcGluZ1Bvc3RhbENvZGU6IHJlcS5ib2R5LnNoaXBwaW5nQWRkcmVzcy5wb3N0YWxDb2RlLFxyXG4gICAgICAgICAgICBzaGlwcGluZ0NvdW50cnk6IHJlcS5ib2R5LnNoaXBwaW5nQWRkcmVzcy5jb3VudHJ5LFxyXG4gICAgICAgICAgICBzaGlwcGluZ0xhdDogcmVxLmJvZHkuc2hpcHBpbmdBZGRyZXNzLmxhdCxcclxuICAgICAgICAgICAgc2hpcHBpbmdMb25nOiByZXEuYm9keS5zaGlwcGluZ0FkZHJlc3MubG9uZyxcclxuICAgICAgICAgICAgb3JkZXJJdGVtczogcmVxLmJvZHkub3JkZXJJdGVtcyxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGluY2x1ZGU6IFt7XHJcbiAgICAgICAgICAgICAgICBtb2RlbDogZGIuT3JkZXJJdGVtLFxyXG4gICAgICAgICAgICAgICAgYXM6ICdvcmRlckl0ZW1zJyxcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVzXHJcbiAgICAgICAgICAgIC5zdGF0dXMoMjAxKVxyXG4gICAgICAgICAgICAuc2VuZCh7IG1lc3NhZ2U6ICdOZXcgT3JkZXIgQ3JlYXRlZCcsIG9yZGVyOiBjcmVhdGVkT3JkZXIgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE9yZGVyID0gYXN5bmNIYW5kbGVyKGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgY29uc3Qgb3JkZXIgPSBhd2FpdCBkYi5PcmRlci5maW5kT25lKHtcclxuICAgICAgICB3aGVyZTogeyBpZDogcmVxLnBhcmFtcy5pZCB9LFxyXG4gICAgICAgIGluY2x1ZGU6IFt7XHJcbiAgICAgICAgICAgIG1vZGVsOiBkYi5PcmRlckl0ZW0sXHJcbiAgICAgICAgICAgIGFzOiAnb3JkZXJJdGVtcycsXHJcbiAgICAgICAgfV1cclxuICAgIH0pO1xyXG4gICAgaWYgKG9yZGVyKSB7XHJcbiAgICAgICAgcmVzLnNlbmQob3JkZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwNCkuc2VuZCh7IG1lc3NhZ2U6ICdPcmRlciBOb3QgRm91bmQnIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVQYXlTdGF0dXMgPSBhc3luY0hhbmRsZXIoYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBjb25zdCBvcmRlciA9IGF3YWl0IGRiLk9yZGVyLmZpbmRCeVBrKHJlcS5wYXJhbXMuaWQpO1xyXG4gICAgaWYgKG9yZGVyKSB7XHJcbiAgICAgICAgb3JkZXIuaXNQYWlkID0gdHJ1ZTtcclxuICAgICAgICBvcmRlci5wYWlkQXQgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIG9yZGVyLnBheW1lbnRJZCA9IHJlcS5ib2R5LmlkO1xyXG4gICAgICAgIG9yZGVyLnBheW1lbnRTdGF0dXMgPSByZXEuYm9keS5zdGF0dXM7XHJcbiAgICAgICAgb3JkZXIucGF5bWVudFVwZGF0ZVRpbWUgPSByZXEuYm9keS51cGRhdGVfdGltZTtcclxuICAgICAgICBvcmRlci5wYXltZW50RW1haWwgPSByZXEuYm9keS5wYXltZW50RW1haWw7XHJcblxyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRPcmRlciA9IGF3YWl0IG9yZGVyLnNhdmUoKTtcclxuICAgICAgICByZXMuc2VuZCh7IG1lc3NhZ2U6ICdPcmRlciBQYWlkJywgb3JkZXI6IHVwZGF0ZWRPcmRlciB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDQpLnNlbmQoeyBtZXNzYWdlOiAnT3JkZXIgTm90IEZvdW5kJyB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgZGVsZXRlT3JkZXIgPSBhc3luY0hhbmRsZXIoYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBjb25zdCBvcmRlciA9IGF3YWl0IGRiLk9yZGVyLmZpbmRCeVBrKHJlcS5wYXJhbXMuaWQpO1xyXG4gICAgaWYgKG9yZGVyKSB7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlT3JkZXIgPSBhd2FpdCBvcmRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgcmVzLnNlbmQoeyBtZXNzYWdlOiAnT3JkZXIgRGVsZXRlZCcsIG9yZGVyOiBkZWxldGVPcmRlciB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDQpLnNlbmQoeyBtZXNzYWdlOiAnT3JkZXIgTm90IEZvdW5kJyB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlRGVsaXZlcnlTdGF0dXMgPSBhc3luY0hhbmRsZXIoYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBjb25zdCBvcmRlciA9IGF3YWl0IGRiLk9yZGVyLmZpbmRCeVBrKHJlcS5wYXJhbXMuaWQpO1xyXG4gICAgaWYgKG9yZGVyKSB7XHJcbiAgICAgICAgb3JkZXIuaXNEZWxpdmVyZWQgPSB0cnVlO1xyXG4gICAgICAgIG9yZGVyLmRlbGl2ZXJlZEF0ID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICAgICAgY29uc3QgdXBkYXRlZE9yZGVyID0gYXdhaXQgb3JkZXIuc2F2ZSgpO1xyXG4gICAgICAgIHJlcy5zZW5kKHsgbWVzc2FnZTogJ09yZGVyIERlbGl2ZXJlZCcsIG9yZGVyOiB1cGRhdGVkT3JkZXIgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHsgbWVzc2FnZTogJ09yZGVyIE5vdCBGb3VuZCcgfSk7XHJcbiAgICB9XHJcbn0pOyJdfQ==