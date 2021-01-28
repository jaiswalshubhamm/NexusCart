"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReview = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.seedProducts = exports.getCategories = exports.getProducts = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _models = require("../models");

var _data = _interopRequireDefault(require("../data"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Op = _models.db.Sequelize.Op;
var getProducts = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _price;

    var pageSize, page, nameLike, name, category, order, min, max, price, ratingRange, rating, nameFilter, categoryFilter, priceFilter, ratingFilter, sortOrder, products, pages;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pageSize = 5;
            page = Number(req.query.pageNumber) || 1;
            nameLike = req.query.name || '';
            name = (0, _defineProperty2["default"])({}, Op.like, "%".concat(nameLike, "%"));
            category = req.query.category || ''; // const seller = req.query.seller || '';

            order = req.query.order || '';
            min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
            max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
            price = (_price = {}, (0, _defineProperty2["default"])(_price, Op.gte, min), (0, _defineProperty2["default"])(_price, Op.lte, max), _price);
            ratingRange = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;
            rating = (0, _defineProperty2["default"])({}, Op.gte, ratingRange);
            nameFilter = name ? {
              name: name
            } : {};
            categoryFilter = category ? {
              category: category
            } : {};
            priceFilter = min !== 0 && max !== 0 ? {
              price: price
            } : {}; // const sellerFilter = seller ? { seller } : {};

            ratingFilter = rating !== 0 ? {
              rating: rating
            } : {};
            sortOrder = order === 'lowest' ? [['price', 'DESC']] : order === 'highest' ? [['price', 'ASC']] : order === 'toprated' ? [['rating', 'DESC']] : [];
            console.log(sortOrder);
            _context.next = 19;
            return _models.db.Product.findAndCountAll({
              where: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, categoryFilter), nameFilter), priceFilter), ratingFilter),
              // order: sortOrder,
              offset: pageSize * (page - 1),
              limit: pageSize
            });

          case 19:
            products = _context.sent;
            pages = Math.ceil(products.count / pageSize);
            res.send(products.rows, page, pages);

          case 22:
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
exports.getProducts = getProducts;
var getCategories = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models.db.Product.findAll({
              attributes: ['category'],
              raw: true,
              group: ['category']
            }).then(function (categories) {
              res.send(categories);
            });

          case 2:
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
exports.getCategories = getCategories;
var seedProducts = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var products, createdProducts;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            products = _data["default"].products.map(function (product) {
              return _objectSpread({}, product);
            });
            _context3.next = 3;
            return _models.db.Product.bulkCreate(products);

          case 3:
            createdProducts = _context3.sent;
            res.send({
              createdProducts: createdProducts
            });

          case 5:
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
exports.seedProducts = seedProducts;
var getProduct = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var product;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.db.Product.findByPk(req.params.id, {
              include: [{
                model: _models.db.Review,
                as: 'reviews'
              }]
            });

          case 2:
            product = _context4.sent;

            if (product) {
              res.send(product);
            } else {
              res.status(404).send({
                message: 'Product Not Found'
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
exports.getProduct = getProduct;
var createProduct = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var createdProduct;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _models.db.Product.create({
              name: 'Sample name' + Date.now(),
              image: '/image/p1.jpg',
              price: 0,
              category: 'Sample Category',
              brand: 'Sample Brand',
              countInStock: 0,
              rating: 0,
              numReviews: 0,
              description: 'Sample Description'
            });

          case 2:
            createdProduct = _context5.sent;
            res.send({
              message: 'Product Created',
              product: createdProduct
            });

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
exports.createProduct = createProduct;
var updateProduct = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var productId, product, updatedProduct;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            productId = req.params.id;
            _context6.next = 3;
            return _models.db.Product.findByPk(productId);

          case 3:
            product = _context6.sent;

            if (!product) {
              _context6.next = 18;
              break;
            }

            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.category = req.body.category;
            product.brand = req.body.brand;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            _context6.next = 14;
            return product.save();

          case 14:
            updatedProduct = _context6.sent;
            res.send({
              message: 'Product Updated',
              product: updatedProduct
            });
            _context6.next = 19;
            break;

          case 18:
            res.status(404).send({
              message: 'Product Not Found'
            });

          case 19:
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
exports.updateProduct = updateProduct;
var deleteProduct = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var product, _deleteProduct;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _models.db.Product.findByPk(req.params.id);

          case 2:
            product = _context7.sent;

            if (!product) {
              _context7.next = 10;
              break;
            }

            _context7.next = 6;
            return product.destroy();

          case 6:
            _deleteProduct = _context7.sent;
            res.send({
              message: 'Product Deleted',
              product: _deleteProduct
            });
            _context7.next = 11;
            break;

          case 10:
            res.status(404).send({
              message: 'Product Not Found'
            });

          case 11:
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
exports.deleteProduct = deleteProduct;
var createReview = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var product, createdReview;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _models.db.Product.findByPk(req.params.id, {
              include: [{
                model: _models.db.Review,
                as: 'reviews'
              }]
            });

          case 2:
            product = _context8.sent;

            if (!product) {
              _context8.next = 16;
              break;
            }

            if (!product.reviews.find(function (x) {
              return x.name === req.user.name;
            })) {
              _context8.next = 6;
              break;
            }

            return _context8.abrupt("return", res.status(400).send({
              message: 'You already submitted a review'
            }));

          case 6:
            _context8.next = 8;
            return _models.db.Review.create({
              productId: product.id,
              name: req.user.name,
              rating: Number(req.body.rating),
              comment: req.body.comment
            });

          case 8:
            createdReview = _context8.sent;
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce(function (a, c) {
              return c.rating + a;
            }, 0) / product.reviews.length;
            _context8.next = 13;
            return product.save();

          case 13:
            res.status(201).send({
              message: 'Review Created',
              review: createdReview
            });
            _context8.next = 17;
            break;

          case 16:
            res.status(404).send({
              message: 'Product Not Found'
            });

          case 17:
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
exports.createReview = createReview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9wcm9kdWN0Q29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJPcCIsImRiIiwiU2VxdWVsaXplIiwiZ2V0UHJvZHVjdHMiLCJyZXEiLCJyZXMiLCJwYWdlU2l6ZSIsInBhZ2UiLCJOdW1iZXIiLCJxdWVyeSIsInBhZ2VOdW1iZXIiLCJuYW1lTGlrZSIsIm5hbWUiLCJsaWtlIiwiY2F0ZWdvcnkiLCJvcmRlciIsIm1pbiIsIm1heCIsInByaWNlIiwiZ3RlIiwibHRlIiwicmF0aW5nUmFuZ2UiLCJyYXRpbmciLCJuYW1lRmlsdGVyIiwiY2F0ZWdvcnlGaWx0ZXIiLCJwcmljZUZpbHRlciIsInJhdGluZ0ZpbHRlciIsInNvcnRPcmRlciIsImNvbnNvbGUiLCJsb2ciLCJQcm9kdWN0IiwiZmluZEFuZENvdW50QWxsIiwid2hlcmUiLCJvZmZzZXQiLCJsaW1pdCIsInByb2R1Y3RzIiwicGFnZXMiLCJNYXRoIiwiY2VpbCIsImNvdW50Iiwic2VuZCIsInJvd3MiLCJnZXRDYXRlZ29yaWVzIiwiZmluZEFsbCIsImF0dHJpYnV0ZXMiLCJyYXciLCJncm91cCIsInRoZW4iLCJjYXRlZ29yaWVzIiwic2VlZFByb2R1Y3RzIiwiZGF0YSIsIm1hcCIsInByb2R1Y3QiLCJidWxrQ3JlYXRlIiwiY3JlYXRlZFByb2R1Y3RzIiwiZ2V0UHJvZHVjdCIsImZpbmRCeVBrIiwicGFyYW1zIiwiaWQiLCJpbmNsdWRlIiwibW9kZWwiLCJSZXZpZXciLCJhcyIsInN0YXR1cyIsIm1lc3NhZ2UiLCJjcmVhdGVQcm9kdWN0IiwiY3JlYXRlIiwiRGF0ZSIsIm5vdyIsImltYWdlIiwiYnJhbmQiLCJjb3VudEluU3RvY2siLCJudW1SZXZpZXdzIiwiZGVzY3JpcHRpb24iLCJjcmVhdGVkUHJvZHVjdCIsInVwZGF0ZVByb2R1Y3QiLCJwcm9kdWN0SWQiLCJib2R5Iiwic2F2ZSIsInVwZGF0ZWRQcm9kdWN0IiwiZGVsZXRlUHJvZHVjdCIsImRlc3Ryb3kiLCJjcmVhdGVSZXZpZXciLCJyZXZpZXdzIiwiZmluZCIsIngiLCJ1c2VyIiwiY29tbWVudCIsImNyZWF0ZWRSZXZpZXciLCJsZW5ndGgiLCJyZWR1Y2UiLCJhIiwiYyIsInJldmlldyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLEVBQUUsR0FBR0MsV0FBR0MsU0FBSCxDQUFhRixFQUF4QjtBQUVPLElBQU1HLFdBQVcsR0FBRztBQUFBLDJGQUFhLGlCQUFPQyxHQUFQLEVBQVlDLEdBQVo7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQzlCQyxZQUFBQSxRQUQ4QixHQUNuQixDQURtQjtBQUU5QkMsWUFBQUEsSUFGOEIsR0FFdkJDLE1BQU0sQ0FBQ0osR0FBRyxDQUFDSyxLQUFKLENBQVVDLFVBQVgsQ0FBTixJQUFnQyxDQUZUO0FBSTlCQyxZQUFBQSxRQUo4QixHQUluQlAsR0FBRyxDQUFDSyxLQUFKLENBQVVHLElBQVYsSUFBa0IsRUFKQztBQUs5QkEsWUFBQUEsSUFMOEIsd0NBS3BCWixFQUFFLENBQUNhLElBTGlCLGFBS05GLFFBTE07QUFPOUJHLFlBQUFBLFFBUDhCLEdBT25CVixHQUFHLENBQUNLLEtBQUosQ0FBVUssUUFBVixJQUFzQixFQVBILEVBUXBDOztBQUNNQyxZQUFBQSxLQVQ4QixHQVN0QlgsR0FBRyxDQUFDSyxLQUFKLENBQVVNLEtBQVYsSUFBbUIsRUFURztBQVc5QkMsWUFBQUEsR0FYOEIsR0FXeEJaLEdBQUcsQ0FBQ0ssS0FBSixDQUFVTyxHQUFWLElBQWlCUixNQUFNLENBQUNKLEdBQUcsQ0FBQ0ssS0FBSixDQUFVTyxHQUFYLENBQU4sS0FBMEIsQ0FBM0MsR0FBK0NSLE1BQU0sQ0FBQ0osR0FBRyxDQUFDSyxLQUFKLENBQVVPLEdBQVgsQ0FBckQsR0FBdUUsQ0FYL0M7QUFZOUJDLFlBQUFBLEdBWjhCLEdBWXhCYixHQUFHLENBQUNLLEtBQUosQ0FBVVEsR0FBVixJQUFpQlQsTUFBTSxDQUFDSixHQUFH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LHFCQUFVQSxDQUFDLENBQUN0RSxNQUFGLEdBQVdxRSxDQUFyQjtBQUFBLGFBQXZCLEVBQStDLENBQS9DLElBQW9EdkMsT0FBTyxDQUFDK0IsT0FBUixDQUFnQk0sTUFBckY7QUFsQmlDO0FBQUEsbUJBbUIzQnJDLE9BQU8sQ0FBQzBCLElBQVIsRUFuQjJCOztBQUFBO0FBb0JqQ3pFLFlBQUFBLEdBQUcsQ0FBQzBELE1BQUosQ0FBVyxHQUFYLEVBQWdCdkIsSUFBaEIsQ0FBcUI7QUFDakJ3QixjQUFBQSxPQUFPLEVBQUUsZ0JBRFE7QUFFakI2QixjQUFBQSxNQUFNLEVBQUVMO0FBRlMsYUFBckI7QUFwQmlDO0FBQUE7O0FBQUE7QUF5QmpDbkYsWUFBQUEsR0FBRyxDQUFDMEQsTUFBSixDQUFXLEdBQVgsRUFBZ0J2QixJQUFoQixDQUFxQjtBQUFFd0IsY0FBQUEsT0FBTyxFQUFFO0FBQVgsYUFBckI7O0FBekJpQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFiOztBQUFBO0FBQUE7QUFBQTtBQUFBLElBQXJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzeW5jSGFuZGxlciBmcm9tIFwiZXhwcmVzcy1hc3luYy1oYW5kbGVyXCJcclxuaW1wb3J0IHsgZGIgfSBmcm9tICcuLi9tb2RlbHMnO1xyXG5pbXBvcnQgZGF0YSBmcm9tICcuLi9kYXRhJztcclxuXHJcbmNvbnN0IE9wID0gZGIuU2VxdWVsaXplLk9wO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFByb2R1Y3RzID0gYXN5bmNIYW5kbGVyKGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgY29uc3QgcGFnZVNpemUgPSA1O1xyXG4gICAgY29uc3QgcGFnZSA9IE51bWJlcihyZXEucXVlcnkucGFnZU51bWJlcikgfHwgMTtcclxuXHJcbiAgICBjb25zdCBuYW1lTGlrZSA9IHJlcS5xdWVyeS5uYW1lIHx8ICcnO1xyXG4gICAgY29uc3QgbmFtZSA9IHsgW09wLmxpa2VdOiBgJSR7bmFtZUxpa2V9JWAgfTtcclxuXHJcbiAgICBjb25zdCBjYXRlZ29yeSA9IHJlcS5xdWVyeS5jYXRlZ29yeSB8fCAnJztcclxuICAgIC8vIGNvbnN0IHNlbGxlciA9IHJlcS5xdWVyeS5zZWxsZXIgfHwgJyc7XHJcbiAgICBjb25zdCBvcmRlciA9IHJlcS5xdWVyeS5vcmRlciB8fCAnJztcclxuXHJcbiAgICBjb25zdCBtaW4gPSByZXEucXVlcnkubWluICYmIE51bWJlcihyZXEucXVlcnkubWluKSAhPT0gMCA/IE51bWJlcihyZXEucXVlcnkubWluKSA6IDA7XHJcbiAgICBjb25zdCBtYXggPSByZXEucXVlcnkubWF4ICYmIE51bWJlcihyZXEucXVlcnkubWF4KSAhPT0gMCA/IE51bWJlcihyZXEucXVlcnkubWF4KSA6IDA7XHJcbiAgICBjb25zdCBwcmljZSA9IHsgW09wLmd0ZV06IG1pbiwgW09wLmx0ZV06IG1heCB9O1xyXG5cclxuICAgIGNvbnN0IHJhdGluZ1JhbmdlID1cclxuICAgICAgICByZXEucXVlcnkucmF0aW5nICYmIE51bWJlcihyZXEucXVlcnkucmF0aW5nKSAhPT0gMFxyXG4gICAgICAgICAgICA/IE51bWJlcihyZXEucXVlcnkucmF0aW5nKVxyXG4gICAgICAgICAgICA6IDA7XHJcbiAgICBjb25zdCByYXRpbmcgPSB7IFtPcC5ndGVdOiByYXRpbmdSYW5nZSB9O1xyXG5cclxuICAgIGNvbnN0IG5hbWVGaWx0ZXIgPSBuYW1lID8geyBuYW1lIH0gOiB7fTtcclxuICAgIGNvbnN0IGNhdGVnb3J5RmlsdGVyID0gY2F0ZWdvcnkgPyB7IGNhdGVnb3J5IH0gOiB7fTtcclxuICAgIGNvbnN0IHByaWNlRmlsdGVyID0gKG1pbiAhPT0gMCkgJiYgKG1heCAhPT0gMCkgPyB7IHByaWNlIH0gOiB7fTtcclxuICAgIC8vIGNvbnN0IHNlbGxlckZpbHRlciA9IHNlbGxlciA/IHsgc2VsbGVyIH0gOiB7fTtcclxuICAgIGNvbnN0IHJhdGluZ0ZpbHRlciA9IChyYXRpbmcgIT09IDApID8geyByYXRpbmcgfSA6IHt9O1xyXG4gICAgY29uc3Qgc29ydE9yZGVyID1cclxuICAgICAgICBvcmRlciA9PT0gJ2xvd2VzdCdcclxuICAgICAgICAgICAgPyBbWydwcmljZScsICdERVNDJ11dXHJcbiAgICAgICAgICAgIDogb3JkZXIgPT09ICdoaWdoZXN0J1xyXG4gICAgICAgICAgICAgICAgPyBbWydwcmljZScsICdBU0MnXV1cclxuICAgICAgICAgICAgICAgIDogb3JkZXIgPT09ICd0b3ByYXRlZCdcclxuICAgICAgICAgICAgICAgICAgICA/IFtbJ3JhdGluZycsICdERVNDJ11dXHJcbiAgICAgICAgICAgICAgICAgICAgOiBbXTtcclxuICAgIGNvbnNvbGUubG9nKHNvcnRPcmRlcik7XHJcbiAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IGRiLlByb2R1Y3QuZmluZEFuZENvdW50QWxsKHtcclxuICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICAuLi5jYXRlZ29yeUZpbHRlcixcclxuICAgICAgICAgICAgLi4ubmFtZUZpbHRlcixcclxuICAgICAgICAgICAgLi4ucHJpY2VGaWx0ZXIsXHJcbiAgICAgICAgICAgIC4uLnJhdGluZ0ZpbHRlcixcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIG9yZGVyOiBzb3J0T3JkZXIsXHJcbiAgICAgICAgb2Zmc2V0OiBwYWdlU2l6ZSAqIChwYWdlIC0gMSksXHJcbiAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxyXG4gICAgfSlcclxuICAgIGNvbnN0IHBhZ2VzID0gTWF0aC5jZWlsKHByb2R1Y3RzLmNvdW50IC8gcGFnZVNpemUpO1xyXG4gICAgcmVzLnNlbmQocHJvZHVjdHMucm93cywgcGFnZSwgcGFnZXMpO1xyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRDYXRlZ29yaWVzID0gYXN5bmNIYW5kbGVyKGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgYXdhaXQgZGIuUHJvZHVjdC5maW5kQWxsKHsgYXR0cmlidXRlczogWydjYXRlZ29yeSddLCByYXc6IHRydWUsIGdyb3VwOiBbJ2NhdGVnb3J5J10gfSlcclxuICAgICAgICAudGhlbigoY2F0ZWdvcmllcykgPT4ge1xyXG4gICAgICAgICAgICByZXMuc2VuZChjYXRlZ29yaWVzKTtcclxuICAgICAgICB9KVxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZWVkUHJvZHVjdHMgPSBhc3luY0hhbmRsZXIoYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBjb25zdCBwcm9kdWN0cyA9IGRhdGEucHJvZHVjdHMubWFwKChwcm9kdWN0KSA9PiAoe1xyXG4gICAgICAgIC4uLnByb2R1Y3QsXHJcbiAgICB9KSk7XHJcbiAgICBjb25zdCBjcmVhdGVkUHJvZHVjdHMgPSBhd2FpdCBkYi5Qcm9kdWN0LmJ1bGtDcmVhdGUocHJvZHVjdHMpO1xyXG4gICAgcmVzLnNlbmQoeyBjcmVhdGVkUHJvZHVjdHMgfSk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFByb2R1Y3QgPSBhc3luY0hhbmRsZXIoYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgZGIuUHJvZHVjdC5maW5kQnlQayhyZXEucGFyYW1zLmlkLCB7XHJcbiAgICAgICAgaW5jbHVkZTogW3tcclxuICAgICAgICAgICAgbW9kZWw6IGRiLlJldmlldyxcclxuICAgICAgICAgICAgYXM6ICdyZXZpZXdzJyxcclxuICAgICAgICB9XSxcclxuICAgIH0pO1xyXG4gICAgaWYgKHByb2R1Y3QpIHtcclxuICAgICAgICByZXMuc2VuZChwcm9kdWN0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDQpLnNlbmQoeyBtZXNzYWdlOiAnUHJvZHVjdCBOb3QgRm91bmQnIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVQcm9kdWN0ID0gYXN5bmNIYW5kbGVyKGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgY29uc3QgY3JlYXRlZFByb2R1Y3QgPSBhd2FpdCBkYi5Qcm9kdWN0LmNyZWF0ZSh7XHJcbiAgICAgICAgbmFtZTogJ1NhbXBsZSBuYW1lJyArIERhdGUubm93KCksXHJcbiAgICAgICAgaW1hZ2U6ICcvaW1hZ2UvcDEuanBnJyxcclxuICAgICAgICBwcmljZTogMCxcclxuICAgICAgICBjYXRlZ29yeTogJ1NhbXBsZSBDYXRlZ29yeScsXHJcbiAgICAgICAgYnJhbmQ6ICdTYW1wbGUgQnJhbmQnLFxyXG4gICAgICAgIGNvdW50SW5TdG9jazogMCxcclxuICAgICAgICByYXRpbmc6IDAsXHJcbiAgICAgICAgbnVtUmV2aWV3czogMCxcclxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NhbXBsZSBEZXNjcmlwdGlvbicsXHJcbiAgICB9KTtcclxuICAgIHJlcy5zZW5kKHsgbWVzc2FnZTogJ1Byb2R1Y3QgQ3JlYXRlZCcsIHByb2R1Y3Q6IGNyZWF0ZWRQcm9kdWN0IH0pO1xyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVQcm9kdWN0ID0gYXN5bmNIYW5kbGVyKGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgY29uc3QgcHJvZHVjdElkID0gcmVxLnBhcmFtcy5pZDtcclxuICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBkYi5Qcm9kdWN0LmZpbmRCeVBrKHByb2R1Y3RJZCk7XHJcbiAgICBpZiAocHJvZHVjdCkge1xyXG4gICAgICAgIHByb2R1Y3QubmFtZSA9IHJlcS5ib2R5Lm5hbWU7XHJcbiAgICAgICAgcHJvZHVjdC5wcmljZSA9IHJlcS5ib2R5LnByaWNlO1xyXG4gICAgICAgIHByb2R1Y3QuaW1hZ2UgPSByZXEuYm9keS5pbWFnZTtcclxuICAgICAgICBwcm9kdWN0LmNhdGVnb3J5ID0gcmVxLmJvZHkuY2F0ZWdvcnk7XHJcbiAgICAgICAgcHJvZHVjdC5icmFuZCA9IHJlcS5ib2R5LmJyYW5kO1xyXG4gICAgICAgIHByb2R1Y3QuY291bnRJblN0b2NrID0gcmVxLmJvZHkuY291bnRJblN0b2NrO1xyXG4gICAgICAgIHByb2R1Y3QuZGVzY3JpcHRpb24gPSByZXEuYm9keS5kZXNjcmlwdGlvbjtcclxuICAgICAgICBjb25zdCB1cGRhdGVkUHJvZHVjdCA9IGF3YWl0IHByb2R1Y3Quc2F2ZSgpO1xyXG4gICAgICAgIHJlcy5zZW5kKHsgbWVzc2FnZTogJ1Byb2R1Y3QgVXBkYXRlZCcsIHByb2R1Y3Q6IHVwZGF0ZWRQcm9kdWN0IH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwNCkuc2VuZCh7IG1lc3NhZ2U6ICdQcm9kdWN0IE5vdCBGb3VuZCcgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZVByb2R1Y3QgPSBhc3luY0hhbmRsZXIoYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgZGIuUHJvZHVjdC5maW5kQnlQayhyZXEucGFyYW1zLmlkKTtcclxuICAgIGlmIChwcm9kdWN0KSB7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlUHJvZHVjdCA9IGF3YWl0IHByb2R1Y3QuZGVzdHJveSgpO1xyXG4gICAgICAgIHJlcy5zZW5kKHsgbWVzc2FnZTogJ1Byb2R1Y3QgRGVsZXRlZCcsIHByb2R1Y3Q6IGRlbGV0ZVByb2R1Y3QgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHsgbWVzc2FnZTogJ1Byb2R1Y3QgTm90IEZvdW5kJyB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlUmV2aWV3ID0gYXN5bmNIYW5kbGVyKGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IGRiLlByb2R1Y3QuZmluZEJ5UGsocmVxLnBhcmFtcy5pZCwge1xyXG4gICAgICAgIGluY2x1ZGU6IFt7XHJcbiAgICAgICAgICAgIG1vZGVsOiBkYi5SZXZpZXcsXHJcbiAgICAgICAgICAgIGFzOiAncmV2aWV3cycsXHJcbiAgICAgICAgfV0sXHJcbiAgICB9KTtcclxuICAgIGlmIChwcm9kdWN0KSB7XHJcbiAgICAgICAgaWYgKHByb2R1Y3QucmV2aWV3cy5maW5kKCh4KSA9PiB4Lm5hbWUgPT09IHJlcS51c2VyLm5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IG1lc3NhZ2U6ICdZb3UgYWxyZWFkeSBzdWJtaXR0ZWQgYSByZXZpZXcnIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjcmVhdGVkUmV2aWV3ID0gYXdhaXQgZGIuUmV2aWV3LmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5pZCxcclxuICAgICAgICAgICAgbmFtZTogcmVxLnVzZXIubmFtZSxcclxuICAgICAgICAgICAgcmF0aW5nOiBOdW1iZXIocmVxLmJvZHkucmF0aW5nKSxcclxuICAgICAgICAgICAgY29tbWVudDogcmVxLmJvZHkuY29tbWVudCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBwcm9kdWN0Lm51bVJldmlld3MgPSBwcm9kdWN0LnJldmlld3MubGVuZ3RoO1xyXG4gICAgICAgIHByb2R1Y3QucmF0aW5nID0gcHJvZHVjdC5yZXZpZXdzLnJlZHVjZSgoYSwgYykgPT4gYy5yYXRpbmcgKyBhLCAwKSAvIHByb2R1Y3QucmV2aWV3cy5sZW5ndGg7XHJcbiAgICAgICAgYXdhaXQgcHJvZHVjdC5zYXZlKCk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDEpLnNlbmQoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAnUmV2aWV3IENyZWF0ZWQnLFxyXG4gICAgICAgICAgICByZXZpZXc6IGNyZWF0ZWRSZXZpZXcsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDA0KS5zZW5kKHsgbWVzc2FnZTogJ1Byb2R1Y3QgTm90IEZvdW5kJyB9KTtcclxuICAgIH1cclxufSk7Il19