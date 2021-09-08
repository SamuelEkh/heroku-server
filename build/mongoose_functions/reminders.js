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
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var List = require('../models/reminders/list');
var addList = function (title, tasks, completed, lock, owner, collaborators, listType) { return __awaiter(void 0, void 0, void 0, function () {
    var list, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                list = new List({
                    title: title,
                    tasks: tasks,
                    completed: completed,
                    lock: lock,
                    owner: owner,
                    collaborators: collaborators,
                    listType: listType,
                });
                return [4 /*yield*/, list.save()];
            case 1:
                _a.sent();
                return [2 /*return*/, list];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, { error: 'Error creating list' }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var findLists = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var lists, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, List.find({
                        $or: [
                            { owner: user },
                            { collaborators: { $all: [user] } },
                        ],
                    })];
            case 1:
                lists = _a.sent();
                if (lists.length === 0)
                    throw new Error('This user has no lists');
                return [2 /*return*/, lists];
            case 2:
                err_2 = _a.sent();
                if (err_2.message === 'This user has no lists') {
                    return [2 /*return*/, { error: err_2.message }];
                }
                return [2 /*return*/, { error: 'Error fetching lists' }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var findOneList = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var list, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, List.find({
                        _id: id,
                    })];
            case 1:
                list = _a.sent();
                if (list.length === 0)
                    throw new Error('List not found');
                return [2 /*return*/, list];
            case 2:
                err_3 = _a.sent();
                if (err_3.message === 'List not found') {
                    return [2 /*return*/, { error: err_3.message }];
                }
                return [2 /*return*/, { error: 'Error fetching list' }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var addTask = function (id, task) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!task || !id)
                    throw new Error('No ID or Task');
                return [4 /*yield*/, List.findOneAndUpdate({
                        _id: id,
                    }, {
                        $push: { tasks: task },
                    }, {
                        new: true,
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
            case 2:
                err_4 = _a.sent();
                if (err_4.message === 'No ID or Task') {
                    return [2 /*return*/, err_4.message];
                }
                return [2 /*return*/, { error: 'Error creating task' }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var listComplete = function (id, complete) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!id)
                    throw new Error('Error updating list');
                return [4 /*yield*/, List.findOneAndUpdate({
                        _id: id,
                    }, {
                        completed: complete,
                    }, {
                        new: true,
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
            case 2:
                err_5 = _a.sent();
                return [2 /*return*/, { error: err_5.message }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var editList = function (list) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!list)
                    throw new Error('Error updating list');
                return [4 /*yield*/, List.replaceOne({
                        _id: list._id,
                    }, list)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
            case 2:
                err_6 = _a.sent();
                return [2 /*return*/, { error: err_6.message }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleteList = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!id)
                    throw new Error('Error deleting list');
                return [4 /*yield*/, List.deleteOne({ _id: id })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
            case 2:
                err_7 = _a.sent();
                return [2 /*return*/, { error: err_7.message }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var taskComplete = function (id, task, complete) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!id || !task)
                    throw new Error('Error updating task');
                return [4 /*yield*/, List.findOneAndUpdate({
                        _id: id,
                        'tasks.mainTask': task.mainTask,
                    }, {
                        $set: { 'tasks.$.completed': complete },
                    }, {
                        new: true,
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
            case 2:
                err_8 = _a.sent();
                return [2 /*return*/, { error: err_8.message }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var editTask = function (id, originalTask, task) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!id || !task || !originalTask)
                    throw new Error('Error updating task');
                return [4 /*yield*/, List.findOneAndUpdate({
                        _id: id,
                        'tasks.mainTask': originalTask,
                    }, {
                        $set: { 'tasks.$': task },
                    }, {
                        new: true,
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
            case 2:
                err_9 = _a.sent();
                return [2 /*return*/, { error: err_9.message }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var removeTask = function (id, tasks) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!id || !tasks)
                    throw new Error('Error removing task');
                return [4 /*yield*/, List.findOneAndUpdate({
                        _id: id,
                    }, {
                        tasks: tasks,
                    }, {
                        new: true,
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
            case 2:
                err_10 = _a.sent();
                return [2 /*return*/, { error: err_10.message }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var subTaskComplete = function (id, task, subtasks) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, List.findOneAndUpdate({
                    _id: id,
                    'tasks.mainTask': task.mainTask,
                }, {
                    $set: { 'tasks.$.subTasks': subtasks },
                }, {
                    new: true,
                })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
module.exports = {
    addList: addList,
    findLists: findLists,
    findOneList: findOneList,
    addTask: addTask,
    listComplete: listComplete,
    taskComplete: taskComplete,
    editTask: editTask,
    removeTask: removeTask,
    subTaskComplete: subTaskComplete,
    editList: editList,
    deleteList: deleteList,
};
