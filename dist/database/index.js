"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const district_1 = require("../models/district");
const city_1 = require("../models/city");
const state_1 = require("../models/state");
const district_city_1 = require("../models/district-city");
const street_type_1 = require("../models/street-type");
const street_1 = require("../models/street");
const street_city_1 = require("../models/street-city");
const zip_code_1 = require("../models/zip-code");
const address_1 = require("../models/address");
const sensor_type_1 = require("../models/sensor-type");
const client_1 = require("../models/client");
const invoice_1 = require("../models/invoice");
const product_1 = require("../models/product");
const sensor_type_product_1 = require("../models/sensor-type-product");
const invoice_item_1 = require("../models/invoice-item");
const localization_1 = __importDefault(require("../models/localization"));
const measurement_1 = require("../models/measurement");
const models = [
    district_1.District,
    city_1.City,
    state_1.State,
    district_city_1.DistrictCity,
    street_type_1.StreetType,
    street_1.Street,
    street_city_1.StreetCity,
    zip_code_1.ZipCode,
    address_1.Address,
    sensor_type_1.SensorType,
    client_1.Client,
    invoice_1.Invoice,
    product_1.Product,
    sensor_type_product_1.SensorTypeProduct,
    invoice_item_1.InvoiceItem,
    localization_1.default,
    measurement_1.Measurement
];
const connection = new sequelize_1.Sequelize(Object.assign({}, database_1.default));
Object.keys(models).forEach((key => {
    models[Number(key)].initialize(connection);
}));
Object.keys(models).forEach(key => {
    if ('associate' in models[Number(key)]) {
        models[Number(key)].associate(connection.models);
    }
});
//# sourceMappingURL=index.js.map