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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const abstract_controller_1 = require("../abstract/abstract-controller");
const client_service_1 = __importDefault(require("../services/client-service"));
const attribute_extractor_1 = require("../utils/attribute-extractor");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
class ClientController extends abstract_controller_1.AbstractController {
    constructor(service) {
        super(service);
        Object.defineProperty(this, "service", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.service = service;
    }
    static default() {
        return new ClientController(new client_service_1.default());
    }
    getByCpf(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cpf } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        cpf: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getByCpf(cpf));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    getByEmail(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        email: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getByEmail(email));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    getProductsByEmail(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        email: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                return res.json(yield this.service.getProductsByEmail(email));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    login(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        email: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        password: {
                            isRequired: true,
                            notEmpty: true
                        }
                    }
                });
                return res.json(yield this.service.login(email, password));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    rememberPassword(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, cpf } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        email: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        password: {
                            isRequired: true,
                            notEmpty: true
                        },
                        cpf: {
                            isRequired: true,
                            notEmpty: true
                        }
                    }
                });
                return res.json(yield this.service.rememberPassword(cpf, email, password));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    updatePassword(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, currentPassword, newPassword, confirmPassword } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        email: {
                            isRequired: true,
                            notEmpty: true,
                        },
                        currentPassword: {
                            isRequired: true,
                            notEmpty: true
                        },
                        newPassword: {
                            isRequired: true,
                            notEmpty: true
                        },
                        confirmPassword: {
                            isRequired: true,
                            notEmpty: true
                        }
                    }
                });
                return res.json(yield this.service.updatePassword(email, currentPassword, newPassword, confirmPassword));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    validateCpf(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cpf } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        cpf: {
                            isRequired: true,
                            notEmpty: true
                        }
                    }
                });
                return res.json(yield this.service.validateCpf(cpf));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    isCpfInUse(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cpf } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        cpf: {
                            isRequired: true,
                            notEmpty: true
                        }
                    }
                });
                return res.json(yield this.service.isCpfInUse(cpf));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    isEmailInUse(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        email: {
                            isRequired: true,
                            notEmpty: true
                        }
                    }
                });
                return res.json(yield this.service.isEmailInUse(email));
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
}
exports.ClientController = ClientController;
exports.default = ClientController;
//# sourceMappingURL=client-controller.js.map