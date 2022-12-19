import config from '../config/database';
import {Sequelize} from "sequelize";
import {District} from "../models/district";
import {City} from "../models/city";
import {State} from "../models/state";
import {DistrictCity} from "../models/district-city";
import {StreetType} from "../models/street-type";
import {Street} from "../models/street";
import {StreetCity} from "../models/street-city";
import {ZipCode} from "../models/zip-code";
import {Address} from "../models/address";
import {SensorType} from "../models/sensor-type";
import {Client} from "../models/client";

const models: any = [
    District,
    City,
    State,
    DistrictCity,
    StreetType,
    Street,
    StreetCity,
    ZipCode,
    Address,
    SensorType,
    Client
];

const connection = new Sequelize(config);

Object.keys(models).forEach((key => {
    models[Number(key)].initialize(connection);
}))

//
Object.keys(models).forEach(key => {
    if ('associate' in models[Number(key)]) {
        models[Number(key)].associate(connection.models);
    }
});