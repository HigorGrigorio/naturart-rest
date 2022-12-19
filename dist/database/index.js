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
const models = [
    district_1.District,
    city_1.City,
    state_1.State,
    district_city_1.DistrictCity,
    street_type_1.StreetType,
    street_1.Street,
    street_city_1.StreetCity
];
const connection = new sequelize_1.Sequelize(database_1.default);
Object.keys(models).forEach((key => {
    models[Number(key)].initialize(connection);
}));
//
Object.keys(models).forEach(key => {
    if ('associate' in models[Number(key)]) {
        models[Number(key)].associate(connection.models);
    }
});
//# sourceMappingURL=index.js.map