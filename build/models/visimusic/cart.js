"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
var cartSchema = new mongoose_1.default.Schema({
    cartUser: { type: String, required: true, unique: true },
    items: { type: Array, required: true }
}, { collection: 'carts' });
var CartSchema = mongoose_1.default.model('cart', cartSchema);
module.exports = CartSchema;
