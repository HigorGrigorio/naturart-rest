import {AbstractController} from "../abstract/abstract-controller";
import {SensorTypeProduct} from "../models/sensor-type-product";
import {SensorTypeProductService} from "../services/sensor-type-product";

export class SensorTypeProductController extends AbstractController<SensorTypeProduct> {
    protected readonly service: SensorTypeProductService;

    /**
     * Construct a new instance of controller.
     * @param service The service.
     */
    constructor(service: SensorTypeProductService) {
        super(service);
        this.service = service;
    }

    /**
     * Default factory method.
     */
    static default() {
        return new SensorTypeProductController(new SensorTypeProductService());
    }
}