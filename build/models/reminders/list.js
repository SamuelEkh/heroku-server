"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var listSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    tasks: { type: Array, required: true },
    completed: { type: Boolean, required: true },
    lock: { type: Boolean, required: true },
    owner: { type: String, required: true },
    collaborators: { type: Array, required: true },
    listType: { type: String, required: true },
}, { collection: 'todo-lists' });
var List = mongoose_1.default.model('todo-lists', listSchema);
module.exports = List;
