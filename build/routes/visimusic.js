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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var mongo = require('../mongoose_functions/visimusic');
router.use(express_1.default.json());
/* router.post('/products/all', async (req: Request, res: Response) => {
  await mongo.postAllProducts(req.body)
    .then((data: any) => res.json(data));
}) */
router.get('/users/:username', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, filter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.username;
                filter = { username: username };
                return [4 /*yield*/, mongo.findUser(filter)
                        .then(function (data) { return res.json(data); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.get('/products/productGroup/:productGroup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productGroup, filter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productGroup = req.params.productGroup;
                filter = { productGroup: productGroup };
                return [4 /*yield*/, mongo.findProducts(filter)
                        .then(function (data) { return res.json(data); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.get('/products/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, filter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                console.log(id);
                filter = { _id: id };
                return [4 /*yield*/, mongo.findProducts(filter)
                        .then(function (data) { return res.json(data); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.get('/products', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongo.findAllProducts()
                    .then(function (data) { return res.json(data); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.post('/products', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description, specs, price, priceRange, productGroup, use, recRating, img, product;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, description = _a.description, specs = _a.specs, price = _a.price, priceRange = _a.priceRange, productGroup = _a.productGroup, use = _a.use, recRating = _a.recRating, img = _a.img;
                return [4 /*yield*/, mongo.addProduct(name, description, specs, price, priceRange, productGroup, use, recRating, img)];
            case 1:
                product = _b.sent();
                res
                    .json(product)
                    .status(201)
                    .end();
                return [2 /*return*/];
        }
    });
}); });
router.post('/users/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, username, password, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, username = _a.username, password = _a.password;
                return [4 /*yield*/, mongo.registerUser(name, email, username, password, function (data) { return res.cookie('token', data); })];
            case 1:
                user = _b.sent();
                console.log(name, username);
                return [4 /*yield*/, mongo.addCart(username)];
            case 2:
                _b.sent();
                res
                    .json()
                    .status(201)
                    .end();
                return [2 /*return*/];
        }
    });
}); });
router.post('/users/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, mongo.loginUser(username, password, function (data) { return res.cookie('token', data); })];
            case 1:
                user = _b.sent();
                res
                    .json()
                    .status(201)
                    .end();
                return [2 /*return*/];
        }
    });
}); });
router.put('/carts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, item, method, id, cart, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, username = _a.username, item = _a.item, method = _a.method, id = _a.id;
                cart = {};
                if (!(method === 'add')) return [3 /*break*/, 2];
                return [4 /*yield*/, mongo.addToCart(username, item)];
            case 1:
                _b = cart = _c.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, mongo.removeFromCart(username, item)];
            case 3:
                _b = cart = _c.sent();
                _c.label = 4;
            case 4:
                _b;
                res
                    .json(cart)
                    .status(201)
                    .end();
                return [2 /*return*/];
        }
    });
}); });
router.get('/carts/:username', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, cart;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.params.username;
                return [4 /*yield*/, mongo.getCart(username)];
            case 1:
                cart = _a.sent();
                res.json(cart);
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
