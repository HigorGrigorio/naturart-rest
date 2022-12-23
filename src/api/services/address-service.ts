import {AbstractService} from "../abstract/abstract-service";
import {Address} from "../models/address";
import NaturartResponse from "../utils/naturart-response";

export class AddressService extends AbstractService<Address> {
    constructor() {
        super(Address);
    }

    async getAll(): Promise<NaturartResponse<Address[]>> {
        const results = await Address.findAll({
            attributes: ['id', 'number', 'complement', 'createdAt', 'updatedAt'],
            include: ['streetCity', 'districtCity', 'clients', 'cep']
        })

        return new NaturartResponse<Address[]>({
            data: results,
            msg: 'Search performs successfully'
        })
    }

    async getById(id: number): Promise<NaturartResponse<Address>> {
        const result = await Address.findByPk(id, {
            attributes: ['id', 'number', 'complement', 'createdAt', 'updatedAt'],
            include: ['streetCity', 'districtCity', 'clients', 'cep']
        });

        if(!result) {
            return new NaturartResponse<Address>({
                isError: true,
                msg: `undefined address with id ${id}`
            });
        }

        return new NaturartResponse<Address>({
            data: result,
            msg: 'Search performs successfully'
        })
    }
}

export default AddressService