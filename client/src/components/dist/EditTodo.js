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
exports.__esModule = true;
exports.EditTodo = void 0;
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var pmt_api_1 = require("../api/pmt-api");
var UpdateState;
(function (UpdateState) {
    UpdateState[UpdateState["NoUpdate"] = 0] = "NoUpdate";
    UpdateState[UpdateState["UpdatingWO"] = 1] = "UpdatingWO";
})(UpdateState || (UpdateState = {}));
var EditTodo = /** @class */ (function (_super) {
    __extends(EditTodo, _super);
    function EditTodo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            name: '',
            description: '',
            dueDate: '',
            done: false,
            assignedTo: '',
            updateState: UpdateState.NoUpdate
        };
        _this.handleOwnerChange = function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setState({ assignedTo: event.target.value });
                return [2 /*return*/];
            });
        }); };
        _this.handleNameChange = function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setState({ name: event.target.value });
                return [2 /*return*/];
            });
        }); };
        _this.handleDescriptionChange = function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setState({ description: event.target.value });
                return [2 /*return*/];
            });
        }); };
        _this.handledueDateChange = function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setState({ dueDate: event.target.value });
                return [2 /*return*/];
            });
        }); };
        _this.handleSubmit = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        this.setUpdateState(UpdateState.UpdatingWO);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, pmt_api_1.patchTodo(this.props.auth.getIdToken(), this.props.match.params.woId, {
                                name: this.state.name,
                                description: this.state.description,
                                dueDate: this.state.dueDate,
                                done: this.state.done,
                                assignedTo: this.state.assignedTo
                            })];
                    case 2:
                        _a.sent();
                        alert('Work order was updated!');
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        alert('Could not update work order: ' + e_1);
                        return [3 /*break*/, 5];
                    case 4:
                        this.setUpdateState(UpdateState.NoUpdate);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    EditTodo.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getWorkorder, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, pmt_api_1.getTodo(this.props.auth.getIdToken(), this.props.match.params.woId)];
                    case 1:
                        getWorkorder = _a.sent();
                        this.setState({
                            name: getWorkorder.name,
                            description: getWorkorder.description,
                            dueDate: getWorkorder.dueDate,
                            done: getWorkorder.done,
                            assignedTo: getWorkorder.assignedTo
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        alert("Failed to fetch workorders: " + e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EditTodo.prototype.setUpdateState = function (updateState) {
        this.setState({
            updateState: updateState
        });
    };
    EditTodo.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h1", null, "Update work order"),
            React.createElement(semantic_ui_react_1.Form, { onSubmit: this.handleSubmit },
                React.createElement(semantic_ui_react_1.Form.Field, null,
                    React.createElement("label", null, "Work order"),
                    React.createElement("input", { type: "text", defaultValue: this.state.assignedTo, placeholder: "assign to...", onChange: this.handleOwnerChange }),
                    React.createElement("input", { type: "text", defaultValue: this.state.name, placeholder: "work order name...", onChange: this.handleNameChange }),
                    React.createElement("input", { type: "text", defaultValue: this.state.description, placeholder: "work order description...", onChange: this.handleDescriptionChange }),
                    React.createElement("input", { type: "text", defaultValue: this.state.dueDate, placeholder: "work order due Date...", onChange: this.handledueDateChange })),
                this.renderButton())));
    };
    EditTodo.prototype.renderButton = function () {
        return (React.createElement("div", null,
            React.createElement(semantic_ui_react_1.Button, { loading: this.state.updateState !== UpdateState.NoUpdate, type: "submit" }, "Update")));
    };
    return EditTodo;
}(React.PureComponent));
exports.EditTodo = EditTodo;
