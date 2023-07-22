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
exports.App = void 0;
const express = require("express");
const express_1 = require("express");
const dispatcher_1 = __importDefault(require("../services/dispatcher"));
require("../database");
const district_controller_1 = require("../controllers/district-controller");
const city_controller_1 = require("../controllers/city-controller");
const state_controller_1 = require("../controllers/state-controller");
const district_city_controller_1 = require("../controllers/district-city-controller");
const street_type_controller_1 = require("../controllers/street-type-controller");
const street_controller_1 = require("../controllers/street-controller");
const street_city_controller_1 = require("../controllers/street-city-controller");
const zip_code_controller_1 = __importDefault(require("../controllers/zip-code-controller"));
const address_controller_1 = require("../controllers/address-controller");
const sensor_type_controller_1 = require("../controllers/sensor-type-controller");
const client_controller_1 = __importDefault(require("../controllers/client-controller"));
const invoice_controller_1 = require("../controllers/invoice-controller");
const product_controller_1 = require("../controllers/product-controller");
const sensor_type_product_controller_1 = require("../controllers/sensor-type-product-controller");
const localization_controller_1 = require("../controllers/localization-controller");
const invoice_item_controller_1 = require("../controllers/invoice-item-controller");
const measurement_controller_1 = require("../controllers/measurement-controller");
class App {
    constructor() {
        Object.defineProperty(this, "core", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dispatcher", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.core = express();
        this.dispatcher = new dispatcher_1.default();
        this.dispatcher
            .register('district', district_controller_1.DistrictController.default())
            .register('city', city_controller_1.CityController.default())
            .register('state', state_controller_1.StateController.default())
            .register('districtCity', district_city_controller_1.DistrictCityController.default())
            .register('streetType', street_type_controller_1.StreetTypeController.default())
            .register('street', street_controller_1.StreetController.default())
            .register('streetCity', street_city_controller_1.StreetCityController.default())
            .register('cep', zip_code_controller_1.default.default())
            .register('address', address_controller_1.AddressController.default())
            .register('sensorType', sensor_type_controller_1.SensorTypeController.default())
            .register('client', client_controller_1.default.default())
            .register('invoice', invoice_controller_1.InvoiceController.default())
            .register('product', product_controller_1.ProductController.default())
            .register('sensorTypeProduct', sensor_type_product_controller_1.SensorTypeProductController.default())
            .register('localization', localization_controller_1.LocalizationController.default())
            .register('invoiceItem', invoice_item_controller_1.InvoiceItemController.default())
            .register('measurement', measurement_controller_1.MeasurementController.default());
        this.core
            .use(express.urlencoded({ extended: true }))
            .use(express.json())
            /**
             * Generic route for controller.
             */
            .use((0, express_1.Router)()
            .all('/rest/:controller/:method/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            return yield this.dispatcher
                .dispatch(req, res);
        })));
    }
    static getInstance() {
        if (App._instance == null) {
            App._instance = new App();
        }
        return App._instance;
    }
    listen(port) {
        var _a;
        (_a = this.core) === null || _a === void 0 ? void 0 : _a.listen(port);
    }
}
exports.App = App;
Object.defineProperty(App, "_instance", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: null
});
//# sourceMappingURL=app.js.map