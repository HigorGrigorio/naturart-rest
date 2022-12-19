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
exports.AbstractController = void 0;
const attribute_extractor_1 = require("../utils/attribute-extractor");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
class AbstractController {
    /**
     * Construct a new instance of controller.
     *
     * @param service IService<M>
     * @protected
     */
    constructor(service) {
        /**
         * The instance of service.
         *
         * @private
         */
        Object.defineProperty(this, "service", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.service = service;
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    add(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let attributes = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    all: true
                });
                const response = yield this.service.add(attributes);
                response.msg = 'Operation performs successfully';
                return res.json(response);
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    deleteById(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let attributes = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        id: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                const response = yield this.service.deleteById(attributes);
                response.msg = 'Operation performs successfully';
                return res.json(response);
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    getAll(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.service.getAll();
                response.msg = 'Operation performs successfully';
                return res.json(response);
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    getById(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    attributes: {
                        id: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                const response = yield this.service.getById(id);
                if (!response.isError) {
                    response.msg = 'Operation performs successfully';
                }
                else {
                    response.msg = 'Undefined entity with id';
                }
                return res.json(response);
            }
            catch (e) {
                return res.status(400).json(new naturart_response_1.default({
                    msg: (_a = e.message) !== null && _a !== void 0 ? _a : 'Inspected Error',
                    isError: true,
                }));
            }
        });
    }
    /**
     * Redirect to service.
     *
     * @param req The request.
     * @param res The response.
     */
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attributes = attribute_extractor_1.AttributeExtractor.extract(req.query, {
                    all: true,
                    attributes: {
                        id: {
                            isRequired: true,
                            notEmpty: true,
                        }
                    }
                });
                const { id } = attributes;
                const response = yield this.service.update({ id }, attributes);
                response.msg = 'Operation performs successfully';
                return res.json(response);
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
exports.AbstractController = AbstractController;
//# sourceMappingURL=abstract-controller.js.map