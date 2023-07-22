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
exports.ProductService = void 0;
const abstract_service_1 = require("../abstract/abstract-service");
const product_1 = require("../models/product");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
const sensor_type_1 = require("../models/sensor-type");
const sensor_type_product_1 = require("../models/sensor-type-product");
const sequelize_1 = require("sequelize");
const invoice_item_1 = require("../models/invoice-item");
class ProductService extends abstract_service_1.AbstractService {
    constructor() {
        super(product_1.Product);
    }
    add(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const { serialCode, name } = attributes;
            // check if serial code is valid.
            const item = yield invoice_item_1.InvoiceItem.findOne({ where: { serialCode } });
            if (!item) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined invoice item with serial code '${serialCode}'`
                });
            }
            const idInvoiceItem = item.id;
            const result = yield this.model.create({ serialCode, idInvoiceItem, name });
            return new naturart_response_1.default({
                data: result,
                msg: 'Persist performs successfully'
            });
        });
    }
    update(where, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const { serialCode, name } = attributes;
            // check if serial code is valid.
            const item = yield invoice_item_1.InvoiceItem.findOne({ where: { serialCode } });
            if (!item) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined invoice item with serial code '${serialCode}'`
                });
            }
            const idInvoiceItem = item.id;
            const result = yield this.model.update({
                idInvoiceItem,
                name,
                serialCode,
            }, {
                where
            }).then(result => result[0]);
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    getBySerialCode(serialCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.Product.findOne({
                where: { serialCode },
                include: [{
                        model: sensor_type_1.SensorType,
                        attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                        through: {
                            attributes: ['id'],
                            as: 'sensorTypeItem'
                        },
                        as: 'types'
                    }],
            });
            if (!product) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined product with serial code '${serialCode}'`
                });
            }
            return new naturart_response_1.default({
                data: product,
                msg: 'Search performs successfully'
            });
        });
    }
    getQttBySensorTypeId(idSensorType) {
        return __awaiter(this, void 0, void 0, function* () {
            const quantity = yield sensor_type_product_1.SensorTypeProduct.count({
                where: { idSensorType }
            });
            return new naturart_response_1.default({
                data: quantity,
                msg: 'Search performs successfully'
            });
        });
    }
    getTypeByProductId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const stps = yield sensor_type_product_1.SensorTypeProduct.findAll({
                where: {
                    idProduct: id
                }
            });
            if (stps.length == 0) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined types for product with id '${id}'`
                });
            }
            const ids = stps.map(val => val.idSensorType);
            const types = yield sensor_type_1.SensorType.findAll({
                where: {
                    id: {
                        [sequelize_1.Op.or]: ids
                    }
                }
            });
            return new naturart_response_1.default({
                data: types,
                msg: 'Search performs successfully',
            });
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.Product.findOne({
                where: { name },
                include: [sensor_type_1.SensorType]
            });
            if (!product) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined product with name '${name}'`
                });
            }
            return new naturart_response_1.default({
                data: product,
                msg: 'Search performs successfully',
            });
        });
    }
    isNameInUse(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield product_1.Product.count({
                where: { name }
            })) > 0;
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    isSerialCodeInUse(serialCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield product_1.Product.count({
                where: { serialCode }
            })) > 0;
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully',
            });
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product-service.js.map