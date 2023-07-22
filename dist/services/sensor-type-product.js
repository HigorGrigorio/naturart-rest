"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorTypeProductService = void 0;
const abstract_service_1 = require("../abstract/abstract-service");
const sensor_type_product_1 = require("../models/sensor-type-product");
class SensorTypeProductService extends abstract_service_1.AbstractService {
    constructor() {
        super(sensor_type_product_1.SensorTypeProduct);
    }
}
exports.SensorTypeProductService = SensorTypeProductService;
//# sourceMappingURL=sensor-type-product.js.map