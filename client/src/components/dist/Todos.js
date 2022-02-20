"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Todos = void 0;
var dateformat_1 = require("dateformat");
var immutability_helper_1 = require("immutability-helper");
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var pmt_api_1 = require("../api/pmt-api");
var Todos = /** @class */ (function (_super) {
    __extends(Todos, _super);
    function Todos() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            todos: [],
            newTodoName: '',
            loadingTodos: true,
            description: '',
            project: '',
            userId: ''
        };
        _this.handleNameChange = function (event) {
            _this.setState({ newTodoName: event.target.value });
        };
        _this.handleDescriptionChange = function (event) {
            _this.setState({ description: event.target.value });
        };
        _this.handleProjectChange = function (event) {
            _this.setState({ project: event.target.value });
        };
        _this.onUploadButtonClick = function (woId) {
            _this.props.history.push("/todos/" + woId + "/upload");
        };
        _this.onTodoCreate = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var dueDate, newWorkorder, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dueDate = this.calculateDueDate();
                        return [4 /*yield*/, pmt_api_1.createTodo(this.props.auth.getIdToken(), {
                                name: this.state.newTodoName,
                                dueDate: dueDate,
                                description: this.state.description,
                                project: this.state.project
                            })];
                    case 1:
                        newWorkorder = _a.sent();
                        this.setState({
                            todos: __spreadArrays(this.state.todos, [newWorkorder]),
                            newTodoName: '',
                            description: '',
                            project: ''
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        alert("Todo creation failed " + error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.onTodoDelete = function (woId) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, pmt_api_1.deleteTodo(this.props.auth.getIdToken(), woId)];
                    case 1:
                        _b.sent();
                        this.setState({
                            todos: this.state.todos.filter(function (todo) { return todo.woId !== woId; })
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        alert('Todo deletion failed');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.onTodoCheck = function (pos) { return __awaiter(_this, void 0, void 0, function () {
            var todo, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        todo = this.state.todos[pos];
                        return [4 /*yield*/, pmt_api_1.patchTodo(this.props.auth.getIdToken(), todo.woId, {
                                name: todo.name,
                                dueDate: todo.dueDate,
                                done: !todo.done,
                                description: todo.description,
                                assignedTo: todo.assignedTo
                            })];
                    case 1:
                        _c.sent();
                        this.setState({
                            todos: immutability_helper_1["default"](this.state.todos, (_b = {},
                                _b[pos] = { done: { $set: !todo.done } },
                                _b))
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _c.sent();
                        alert('Todo deletion failed');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.onEditButtonClick = function (woId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.props.history.push("/todos/" + woId + "/edit");
                return [2 /*return*/];
            });
        }); };
        return _this;
    }
    Todos.prototype.getUserId = function () {
        var idToken = this.props.auth.getIdToken();
        var jwt = require("jsonwebtoken");
        var tokenPayload = jwt.decode(idToken);
        var userId = tokenPayload.sub;
        return userId;
    };
    Todos.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var todos, userId, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, pmt_api_1.getTodos(this.props.auth.getIdToken())];
                    case 1:
                        todos = _a.sent();
                        userId = this.getUserId();
                        this.setState({
                            todos: todos,
                            loadingTodos: false,
                            userId: userId
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        alert("Failed to fetch workorders: " + e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Todos.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(semantic_ui_react_1.Header, { as: "h1" }, "TODOs"),
            React.createElement("h2", null,
                "Welcome! Your user ID is: ",
                this.state.userId),
            this.renderCreateTodoInput(),
            this.renderTodos()));
    };
    Todos.prototype.renderCreateTodoInput = function () {
        return (React.createElement(semantic_ui_react_1.Grid.Row, null,
            React.createElement(semantic_ui_react_1.Grid.Column, { width: 16 },
                React.createElement(semantic_ui_react_1.Input, { action: {
                        color: 'teal',
                        labelPosition: 'left',
                        icon: 'add',
                        content: 'New task',
                        onClick: this.onTodoCreate
                    }, fluid: true, actionPosition: "left", placeholder: "To change the world...", onChange: this.handleNameChange }),
                React.createElement(semantic_ui_react_1.Input, { fluid: true, actionPosition: "left", placeholder: "Add description...", onChange: this.handleDescriptionChange }),
                React.createElement(semantic_ui_react_1.Input, { fluid: true, actionPosition: "left", placeholder: "Add project name...", onChange: this.handleProjectChange })),
            React.createElement(semantic_ui_react_1.Grid.Column, { width: 16 },
                React.createElement(semantic_ui_react_1.Divider, null))));
    };
    Todos.prototype.renderTodos = function () {
        if (this.state.loadingTodos) {
            return this.renderLoading();
        }
        return this.renderTodosList();
    };
    Todos.prototype.renderLoading = function () {
        return (React.createElement(semantic_ui_react_1.Grid.Row, null,
            React.createElement(semantic_ui_react_1.Loader, { indeterminate: true, active: true, inline: "centered" }, "Loading TODOs")));
    };
    Todos.prototype.renderTodosList = function () {
        var _this = this;
        var _a;
        return (React.createElement(semantic_ui_react_1.Grid, { padded: true }, (_a = this.state.todos) === null || _a === void 0 ? void 0 : _a.map(function (todo, pos) {
            return (React.createElement(semantic_ui_react_1.Grid.Row, { key: todo.woId },
                React.createElement(semantic_ui_react_1.Grid.Column, { width: 1, verticalAlign: "middle" },
                    React.createElement(semantic_ui_react_1.Checkbox, { onChange: function () { return _this.onTodoCheck(pos); }, checked: todo.done })),
                React.createElement(semantic_ui_react_1.Grid.Column, { width: 9, verticalAlign: "middle" }, todo.name),
                React.createElement(semantic_ui_react_1.Grid.Column, { width: 3, floated: "right" }, todo.dueDate),
                React.createElement(semantic_ui_react_1.Grid.Column, { width: 1, floated: "right" },
                    React.createElement(semantic_ui_react_1.Button, { icon: true, color: "blue", onClick: function () { return _this.onUploadButtonClick(todo.woId); } },
                        React.createElement(semantic_ui_react_1.Icon, { name: "upload" }))),
                React.createElement(semantic_ui_react_1.Grid.Column, { width: 1, floated: "right" },
                    React.createElement(semantic_ui_react_1.Button, { icon: true, color: "blue", onClick: function () { return _this.onEditButtonClick(todo.woId); } },
                        React.createElement(semantic_ui_react_1.Icon, { name: "pencil" }))),
                React.createElement(semantic_ui_react_1.Grid.Column, { width: 1, floated: "right" },
                    React.createElement(semantic_ui_react_1.Button, { icon: true, color: "red", onClick: function () { return _this.onTodoDelete(todo.woId); } },
                        React.createElement(semantic_ui_react_1.Icon, { name: "delete" }))),
                todo.attachmentUrl && (React.createElement(semantic_ui_react_1.Image, { src: todo.attachmentUrl, size: "small", wrapped: true })),
                React.createElement(semantic_ui_react_1.Grid.Column, { width: 16 },
                    React.createElement(semantic_ui_react_1.Divider, null)),
                React.createElement(semantic_ui_react_1.Grid.Column, { width: 4, verticalAlign: "middle" },
                    "Project: ",
                    todo.project),
                React.createElement(semantic_ui_react_1.Grid.Column, { width: 12, verticalAlign: "middle" },
                    "description: ",
                    todo.description),
                React.createElement(semantic_ui_react_1.Grid.Column, { width: 16 },
                    React.createElement(semantic_ui_react_1.Divider, null))));
        })));
    };
    Todos.prototype.calculateDueDate = function () {
        var date = new Date();
        date.setDate(date.getDate() + 7);
        return dateformat_1["default"](date, 'yyyy-mm-dd');
    };
    return Todos;
}(React.PureComponent));
exports.Todos = Todos;
