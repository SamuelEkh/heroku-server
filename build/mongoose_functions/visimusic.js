"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
require('dotenv').config();
var mongoose = require('mongoose');
var Product = require('../models/visimusic/products');
var User = require('../models/visimusic/user');
var Cart = require('../models/visimusic/cart');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
/* mongoose.connect(`mongodb+srv://Samuel:${process.env.REMINDERS_DB_KEY}@cluster0.tffuu.mongodb.net/Reminders?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}) */
/* const postAllProducts = async (products: any) => {
  products.forEach((product: any) => {
    const allProducts = new Product(product);
    allProducts.save();
  })
}
 */
var findUser = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.find(filter).exec()];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
var findProducts = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product.find(filter).exec()];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
var findAllProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product.find({}).exec()];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
var addProduct = function (name, description, specs, price, priceRange, productGroup, use, recRating, img) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        product = new Product({
            name: name,
            description: description,
            specs: specs,
            price: price,
            priceRange: priceRange,
            productGroup: productGroup,
            use: use,
            recRating: recRating,
            sales: 0,
            rating: 0,
            reviews: [],
            img: img
        });
        product.save(function (err) {
            if (err)
                return console.log(err);
        });
        return [2 /*return*/];
    });
}); };
var addCart = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var cart;
    return __generator(this, function (_a) {
        cart = new Cart({
            cartUser: username,
            items: []
        });
        cart.save(function (err) {
            if (err)
                return console.log(err);
        });
        return [2 /*return*/];
    });
}); };
var addToCart = function (cartUser, item) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Cart.findOneAndUpdate({ cartUser: cartUser }, { $push: { items: item } }, { new: true })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
var removeFromCart = function (cartUser, item) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Cart.findOneAndUpdate({ cartUser: cartUser }, { $pull: { 'items': { 'idInCart': item.idInCart } } }, { new: true })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
var getCart = function (cartUser) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Cart.find({ cartUser: cartUser })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response[0].items];
        }
    });
}); };
var registerUser = function (name, email, username, password, cb) { return __awaiter(void 0, void 0, void 0, function () {
    var encryptedPassword, response, user, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!name || typeof (name) !== 'string') {
                    console.log('Invalid name');
                    // return res.json({status: 'error', error: 'Invalid name'})
                }
                if (!email || typeof (email) !== 'string') {
                    console.log('Invalid email');
                    // return res.json({status: 'error', error: 'Invalid email'})
                }
                if (!username || typeof (username) !== 'string') {
                    console.log('Invalid username');
                    // return res.json({status: 'error', error: 'Invalid username'})
                }
                if (!password || typeof (password) !== 'string') {
                    console.log('Invalid password');
                    // return res.json({status: 'error', error: 'Invalid password'})
                }
                if (password.length < 5) {
                    console.log('Password too short');
                    // return res.json({status: 'error', error: 'Password too short'})
                }
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 1:
                encryptedPassword = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, User.create({
                        name: name,
                        email: email,
                        username: username,
                        encryptedPassword: encryptedPassword
                    })];
            case 3:
                response = _a.sent();
                console.log('User created:', response);
                return [4 /*yield*/, User.findOne({ username: username }).lean()];
            case 4:
                user = _a.sent();
                token = jwt.sign({
                    id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email
                }, process.env.JWT_SECRET);
                return [2 /*return*/, cb(token)];
            case 5:
                error_1 = _a.sent();
                if (error_1.code === 11000) {
                    return [2 /*return*/, console.log({ status: 'error', error: 'Username already in use' })];
                }
                throw error_1;
            case 6: return [2 /*return*/];
        }
    });
}); };
var loginUser = function (username, password, cb) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.findOne({ username: username }).lean()];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, bcrypt.compare(password, user.encryptedPassword)];
            case 2:
                // if(!user) {
                //   return res.json({status: 'error', error: 'Invalid username/password'})
                // }
                if (_a.sent()) {
                    token = jwt.sign({
                        id: user._id,
                        username: user.username,
                        name: user.name,
                        email: user.email
                    }, process.env.JWT_SECRET);
                    return [2 /*return*/, cb(token)];
                    // res.cookie('token', token);
                    // return res.json({status: 'ok', data: token})
                }
                return [2 /*return*/, console.log('error in loginUser')
                    // res.json({status: 'error', error: 'invalid username/password'})
                ];
        }
    });
}); };
module.exports = {
    addProduct: addProduct,
    findProducts: findProducts,
    findAllProducts: findAllProducts,
    registerUser: registerUser,
    loginUser: loginUser,
    addCart: addCart,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    getCart: getCart,
    findUser: findUser
};
