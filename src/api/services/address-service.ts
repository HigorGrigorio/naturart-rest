import {AbstractService} from "../abstract/abstract-service";
import {Address} from "../models/address";

export class AddressService extends AbstractService<Address> {
    constructor() {
        super(Address);
    }
}

export default AddressService