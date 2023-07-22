"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const abstract_controller_1 = require("../abstract/abstract-controller");
const address_service_1 = require("../services/address-service");
class AddressController extends abstract_controller_1.AbstractController {
    constructor(service) {
        super(service);
    }
    static default() {
        return new AddressController(new address_service_1.AddressService());
    }
}
exports.AddressController = AddressController;
//# sourceMappingURL=address-controller.js.map