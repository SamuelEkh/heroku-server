"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
var productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    specs: { type: Array, required: true },
    price: { type: String, required: true },
    priceRange: { type: String, required: true },
    productGroup: { type: String, required: true },
    use: { type: Array, required: true },
    recRating: { type: Number, required: true },
    sales: { type: Number },
    rating: { type: Number },
    reviews: { type: Array },
    img: { type: String, required: true },
}, { collection: 'products' });
var ProductSchema = mongoose_1.default.model('Product', productSchema);
module.exports = ProductSchema;
