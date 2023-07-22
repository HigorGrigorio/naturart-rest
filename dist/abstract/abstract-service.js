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
exports.AbstractService = void 0;
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
class AbstractService {
    /**
     * Construct a new instance of abstract entity.
     *
     * @param model A static class that represents a model.
     * @protected
     */
    constructor(model) {
        /**
         * static model.
         *
         * @private
         */
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.model = model;
    }
    /**
     * Add a new model instance in the database.
     *
     * @param attributes. The attributes to build and save a new instance.
     * @returns {Promise<number>} A new model object.
     */
    add(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.create(Object.assign({}, attributes));
            return new naturart_response_1.default({
                data: result,
                msg: "Persist performs successfully",
            });
        });
    }
    /**
     * Delete an entity with base in the id.
     *
     * @param where Options to deletion match.
     * @returns {Promise<number>} The number of deleted rows.
     */
    deleteById(where) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.destroy({
                where,
            });
            return new naturart_response_1.default({
                data: result,
                msg: "Deleted performs successfully",
            });
        });
    }
    /**
     * Get All models instances from database.
     *
     * @returns {Promise<M[]>} All models.
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findAll();
            return new naturart_response_1.default({
                data: result,
                msg: "Search performs successfully",
            });
        });
    }
    /**
     * Finds a model with base in the id.
     *
     * @param id : number Id to find.
     * @returns {Promise<M | null>} A model with base in the id.
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findByPk(id);
            if (!result) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: "Undefined entity with id " + id,
                });
            }
            return new naturart_response_1.default({
                data: result,
                msg: "Search performs successfully",
            });
        });
    }
    /**
     * Update a model into database.
     *
     * @param where Options to update match.
     * @param attributes. The attributes to build and save a new instance.
     * @return {Promise<number>} A new instance value.
     */
    update(where, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model
                .update(attributes, {
                where,
            })
                .then((result) => result[0]);
            return new naturart_response_1.default({
                data: result,
                msg: "Search performs successfully",
            });
        });
    }
}
exports.AbstractService = AbstractService;
//# sourceMappingURL=abstract-service.js.map