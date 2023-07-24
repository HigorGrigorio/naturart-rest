import express = require('express');
import {Application, Router} from "express";
import Dispatcher from "../services/dispatcher";

import '../database'

import {DistrictController} from "../controllers/district-controller";
import {CityController} from "../controllers/city-controller";
import {StateController} from "../controllers/state-controller";
import {DistrictCityController} from "../controllers/district-city-controller";
import {StreetTypeController} from "../controllers/street-type-controller";
import {StreetController} from "../controllers/street-controller";
import {StreetCityController} from "../controllers/street-city-controller";
import ZipCodeController from "../controllers/zip-code-controller";
import {AddressController} from "../controllers/address-controller";
import {SensorTypeController} from "../controllers/sensor-type-controller";
import ClientController from "../controllers/client-controller";
import {InvoiceController} from "../controllers/invoice-controller";
import {ProductController} from "../controllers/product-controller";
import {SensorTypeProductController} from "../controllers/sensor-type-product-controller";
import {LocalizationController} from "../controllers/localization-controller";
import {InvoiceItemController} from "../controllers/invoice-item-controller";
import {MeasurementController} from "../controllers/measurement-controller";

export class App {
    private static _instance?: App | null = null;
    public readonly core: Application;
    public readonly dispatcher: Dispatcher;

    public static getInstance() {
        if (App._instance == null) {
            App._instance = new App();
        }
        return App._instance;
    }

    constructor() {
        this.core = express();
        this.dispatcher = new Dispatcher();

        this.dispatcher
            .register('district', DistrictController.default())
            .register('city', CityController.default())
            .register('state', StateController.default())
            .register('districtCity', DistrictCityController.default())
            .register('streetType', StreetTypeController.default())
            .register('street', StreetController.default())
            .register('streetCity', StreetCityController.default())
            .register('cep', ZipCodeController.default())
            .register('address', AddressController.default())
            .register('sensorType', SensorTypeController.default())
            .register('client', ClientController.default())
            .register('invoice', InvoiceController.default())
            .register('product', ProductController.default())
            .register('sensorTypeProduct', SensorTypeProductController.default())
            .register('localization', LocalizationController.default())
            .register('invoiceItem', InvoiceItemController.default())
            .register('measurement', MeasurementController.default())

        this.core
            .use(express.urlencoded({extended: true}))
            .use(express.json())

            /**
             * Generic route for controller.
             */
            .use(Router()
                .all('/naturart/rest/:controller/:method/', async (req, res) => {
                    return await this.dispatcher
                        .dispatch(req, res);
                })
            )
    }

    public listen(port: string): void {
        this.core?.listen(port)
    }
}
