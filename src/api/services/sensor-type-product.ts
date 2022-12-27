import {AbstractService} from "../abstract/abstract-service";
import {SensorTypeProduct} from "../models/sensor-type-product";

export class SensorTypeProductService extends AbstractService<SensorTypeProduct> {
    constructor() {
        super(SensorTypeProduct);
    }
}