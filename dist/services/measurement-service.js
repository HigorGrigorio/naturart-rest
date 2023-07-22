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
exports.MeasurementService = void 0;
const abstract_service_1 = require("../abstract/abstract-service");
const measurement_1 = require("../models/measurement");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
const sequelize_1 = require("sequelize");
const sensor_type_product_1 = require("../models/sensor-type-product");
const product_1 = require("../models/product");
class MeasurementService extends abstract_service_1.AbstractService {
    constructor() {
        super(measurement_1.Measurement);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const measurements = yield measurement_1.Measurement.findAll({
                attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
                include: ['measurementInfo']
            });
            return new naturart_response_1.default({
                msg: 'Search performs successfully',
                data: measurements
            });
        });
    }
    getByProductId(idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield sensor_type_product_1.SensorTypeProduct.findAll({
                where: { idProduct }
            });
            if (products.length === 0) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined types to product with id '${idProduct}'`
                });
            }
            const measurements = yield measurement_1.Measurement.findAll({
                where: {
                    idSensorTypeProduct: {
                        [sequelize_1.Op.or]: products.map(product => product.id)
                    }
                },
                attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
                include: ['measurementInfo']
            });
            return new naturart_response_1.default({
                data: measurements,
                msg: 'Search performs successfully'
            });
        });
    }
    getByProductIdAndInterval(idProduct, startInterval, endInterval) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield sensor_type_product_1.SensorTypeProduct.findAll({
                where: { idProduct }
            });
            if (products.length === 0) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined types to product with id '${idProduct}'`
                });
            }
            const ids = products.map(product => product.id);
            const measurements = typeof startInterval === 'undefined' || startInterval === 'null' ? yield measurement_1.Measurement.findAll({
                where: {
                    idSensorTypeProduct: {
                        [sequelize_1.Op.or]: ids
                    },
                    measurementDate: {
                        [sequelize_1.Op.lte]: endInterval
                    }
                },
                attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
                include: ['measurementInfo']
            }) : typeof endInterval === 'undefined' || endInterval === 'null' ? yield measurement_1.Measurement.findAll({
                where: {
                    idSensorTypeProduct: {
                        [sequelize_1.Op.or]: ids
                    },
                    measurementDate: {
                        [sequelize_1.Op.gte]: startInterval
                    }
                },
                attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
                include: ['measurementInfo']
            }) : yield measurement_1.Measurement.findAll({
                where: {
                    idSensorTypeProduct: {
                        [sequelize_1.Op.or]: ids
                    },
                    measurementDate: {
                        [sequelize_1.Op.between]: [startInterval, endInterval]
                    }
                },
                attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
                include: ['measurementInfo']
            });
            return new naturart_response_1.default({
                data: measurements,
                msg: 'Search performs successfully'
            });
        });
    }
    getByProductAndType(idProduct, idSensorType) {
        return __awaiter(this, void 0, void 0, function* () {
            const stp = yield sensor_type_product_1.SensorTypeProduct.findOne({
                where: {
                    idProduct,
                    idSensorType
                }
            });
            if (!stp) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined product with id '${idProduct}' and type with id '${idSensorType}'`
                });
            }
            const measurements = yield measurement_1.Measurement.findAll({
                where: {
                    idSensorTypeProduct: stp.id
                },
                attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
                include: ['measurementInfo']
            });
            return new naturart_response_1.default({
                data: measurements,
                msg: 'Search performs successfully'
            });
        });
    }
    getByProductIdAndTypeAndInterval(idProduct, idSensorType, startInterval, endInterval) {
        return __awaiter(this, void 0, void 0, function* () {
            const stp = yield sensor_type_product_1.SensorTypeProduct.findOne({
                where: {
                    idProduct,
                    idSensorType
                }
            });
            if (!stp) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined product with id '${idProduct}' and type with id '${idSensorType}'`
                });
            }
            const idSensorTypeProduct = stp.id;
            const measurements = typeof startInterval === 'undefined' || startInterval === 'null' ? yield measurement_1.Measurement.findAll({
                where: {
                    idSensorTypeProduct,
                    measurementDate: {
                        [sequelize_1.Op.lte]: endInterval
                    }
                },
                attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
                include: ['measurementInfo']
            }) : typeof endInterval === 'undefined' || endInterval === 'null' ? yield measurement_1.Measurement.findAll({
                where: {
                    idSensorTypeProduct,
                    measurementDate: {
                        [sequelize_1.Op.gte]: startInterval
                    }
                },
                attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
                include: ['measurementInfo']
            }) : yield measurement_1.Measurement.findAll({
                where: {
                    idSensorTypeProduct,
                    measurementDate: {
                        [sequelize_1.Op.between]: [startInterval, endInterval]
                    }
                },
                attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
                include: ['measurementInfo']
            });
            return new naturart_response_1.default({
                data: measurements,
                msg: 'Search performs successfully'
            });
        });
    }
    getProductByMeasurementId(idMeasurement) {
        return __awaiter(this, void 0, void 0, function* () {
            const measurement = yield measurement_1.Measurement.findByPk(idMeasurement);
            if (!measurement) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined measurement with id '${idMeasurement}'`
                });
            }
            const stp = yield sensor_type_product_1.SensorTypeProduct.findByPk(measurement.idSensorTypeProduct);
            if (!stp) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined measurement with id '${idMeasurement}'`
                });
            }
            const product = yield product_1.Product.findByPk(stp.idProduct);
            if (!product) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined product with id '${stp.idProduct}'`
                });
            }
            return new naturart_response_1.default({
                data: product,
                msg: 'Search performs successfully'
            });
        });
    }
}
exports.MeasurementService = MeasurementService;
//# sourceMappingURL=measurement-service.js.map