import {AbstractController} from "../abstract/abstract-controller";
import {Address} from "../models/address";
import {AddressService} from "../services/address-service";

export class AddressController extends AbstractController<Address> {
    constructor(service: AddressService) {
        super(service);
    }

    static default(): AddressController {
        return new AddressController(new AddressService());
    }
}