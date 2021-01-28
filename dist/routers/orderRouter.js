"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _orderController = require("../controllers/orderController");

var _utils = require("../utils");

var orderRouter = (0, _express.Router)();
orderRouter.get('/', _utils.isAuth, _utils.isSellerOrAdmin, _orderController.getOrders);
orderRouter.get('/mine', _utils.isAuth, _orderController.getMineOrder);
orderRouter.post('/', _utils.isAuth, _orderController.createOrder);
orderRouter.get('/:id', _utils.isAuth, _orderController.getOrder);
orderRouter.put('/:id/pay', _utils.isAuth, _orderController.updatePayStatus);
orderRouter["delete"]('/:id', _utils.isAuth, _utils.isAdmin, _orderController.deleteOrder);
orderRouter.put('/:id/deliver', _utils.isAuth, _utils.isAdmin, _orderController.updateDeliveryStatus);
var _default = orderRouter;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXJzL29yZGVyUm91dGVyLmpzIl0sIm5hbWVzIjpbIm9yZGVyUm91dGVyIiwiZ2V0IiwiaXNBdXRoIiwiaXNTZWxsZXJPckFkbWluIiwiZ2V0T3JkZXJzIiwiZ2V0TWluZU9yZGVyIiwicG9zdCIsImNyZWF0ZU9yZGVyIiwiZ2V0T3JkZXIiLCJwdXQiLCJ1cGRhdGVQYXlTdGF0dXMiLCJpc0FkbWluIiwiZGVsZXRlT3JkZXIiLCJ1cGRhdGVEZWxpdmVyeVN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBLElBQU1BLFdBQVcsR0FBRyxzQkFBcEI7QUFFQUEsV0FBVyxDQUFDQyxHQUFaLENBQWdCLEdBQWhCLEVBQXFCQyxhQUFyQixFQUE2QkMsc0JBQTdCLEVBQThDQywwQkFBOUM7QUFDQUosV0FBVyxDQUFDQyxHQUFaLENBQWdCLE9BQWhCLEVBQXlCQyxhQUF6QixFQUFpQ0csNkJBQWpDO0FBQ0FMLFdBQVcsQ0FBQ00sSUFBWixDQUFpQixHQUFqQixFQUFzQkosYUFBdEIsRUFBOEJLLDRCQUE5QjtBQUNBUCxXQUFXLENBQUNDLEdBQVosQ0FBZ0IsTUFBaEIsRUFBd0JDLGFBQXhCLEVBQWdDTSx5QkFBaEM7QUFDQVIsV0FBVyxDQUFDUyxHQUFaLENBQWdCLFVBQWhCLEVBQTRCUCxhQUE1QixFQUFvQ1EsZ0NBQXBDO0FBQ0FWLFdBQVcsVUFBWCxDQUFtQixNQUFuQixFQUEyQkUsYUFBM0IsRUFBbUNTLGNBQW5DLEVBQTRDQyw0QkFBNUM7QUFDQVosV0FBVyxDQUFDUyxHQUFaLENBQWdCLGNBQWhCLEVBQWdDUCxhQUFoQyxFQUF3Q1MsY0FBeEMsRUFBaURFLHFDQUFqRDtlQUVlYixXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7IGdldE9yZGVycywgZ2V0TWluZU9yZGVyLCBjcmVhdGVPcmRlciwgZ2V0T3JkZXIsIHVwZGF0ZVBheVN0YXR1cywgZGVsZXRlT3JkZXIsIHVwZGF0ZURlbGl2ZXJ5U3RhdHVzIH0gZnJvbSAnLi4vY29udHJvbGxlcnMvb3JkZXJDb250cm9sbGVyJztcclxuaW1wb3J0IHsgaXNBZG1pbiwgaXNBdXRoLCBpc1NlbGxlck9yQWRtaW4gfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5jb25zdCBvcmRlclJvdXRlciA9IFJvdXRlcigpO1xyXG5cclxub3JkZXJSb3V0ZXIuZ2V0KCcvJywgaXNBdXRoLCBpc1NlbGxlck9yQWRtaW4sIGdldE9yZGVycyk7XHJcbm9yZGVyUm91dGVyLmdldCgnL21pbmUnLCBpc0F1dGgsIGdldE1pbmVPcmRlcik7XHJcbm9yZGVyUm91dGVyLnBvc3QoJy8nLCBpc0F1dGgsIGNyZWF0ZU9yZGVyKTtcclxub3JkZXJSb3V0ZXIuZ2V0KCcvOmlkJywgaXNBdXRoLCBnZXRPcmRlcik7XHJcbm9yZGVyUm91dGVyLnB1dCgnLzppZC9wYXknLCBpc0F1dGgsIHVwZGF0ZVBheVN0YXR1cyk7XHJcbm9yZGVyUm91dGVyLmRlbGV0ZSgnLzppZCcsIGlzQXV0aCwgaXNBZG1pbiwgZGVsZXRlT3JkZXIpO1xyXG5vcmRlclJvdXRlci5wdXQoJy86aWQvZGVsaXZlcicsIGlzQXV0aCwgaXNBZG1pbiwgdXBkYXRlRGVsaXZlcnlTdGF0dXMpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3JkZXJSb3V0ZXI7Il19