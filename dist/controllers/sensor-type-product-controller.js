"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorTypeProductController = void 0;
const abstract_controller_1 = require("../abstract/abstract-controller");
const sensor_type_product_1 = require("../services/sensor-type-product");
class SensorTypeProductController extends abstract_controller_1.AbstractController {
    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
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
    /**
     * Default factory method.
     */
    static default() {
        return new SensorTypeProductController(new sensor_type_product_1.SensorTypeProductService());
    }
}
exports.SensorTypeProductController = SensorTypeProductController;
//# sourceMappingURL=sensor-type-product-controller.js.map