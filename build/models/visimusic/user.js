"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
var userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    encryptedPassword: { type: String, required: true }
}, { collection: 'users' });
/* const visiDB = mongoose.connection.useDb('VisiShop');

const UserSchema = visiDB.model('user', userSchema); */
var UserSchema = mongoose_1.default.model('user', userSchema);
module.exports = UserSchema;
