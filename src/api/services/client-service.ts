import {AbstractService} from "../abstract/abstract-service";
import {Client} from "../models/client";
import {City} from "../models/city";
import NaturartResponse from "../utils/naturart-response";
import CPFValidator from "./validators/cpf-validator";
import {EmailValidator} from "./validators/email-validator";
import {Address} from "../models/address";
import {CreationAttributes} from "sequelize/types/model";

export class ClientService extends AbstractService<Client> {
    /**
     * Construct a new instance of entity.
     */
    constructor() {
        super(Client);
    }

    /**
     * Add a new model instance in the database.
     *
     * @param attributes. The attributes to build and save a new instance.
     * @returns {Promise<number>} A new model object.
     */
    public async add(attributes: CreationAttributes<Client> /* using creational attributes with abstract controller */): Promise<NaturartResponse<Client>> {
        // validate cpf.
        const {cpf} = attributes;

        if(!CPFValidator.isValid(cpf)) {
            return new NaturartResponse<Client>({
                isError: true,
                msg: 'Invalid CPF'
            });
        }

        // validate email.
        const {email} = attributes;

        if(!EmailValidator.isValid(email)){
            return new NaturartResponse<Client>({
                isError: true,
                msg: 'Invalid email'
            });
        }

        const result = await this.model.create({...attributes});

        return new NaturartResponse<Client>({
            data: result
        });
    }

    async getByCpf(cpf: string): Promise<NaturartResponse<Client>> {
        if (!CPFValidator.isValid(cpf)) {
            return new NaturartResponse<Client>({
                isError: true,
                msg: 'The CPF is not valid.'
            })
        }

        const result = await Client.findOne({where: {cpf}});

        if (!result) {
            return new NaturartResponse<Client>({
                isError: true,
                msg: `Not found client with cpf ${cpf}`
            });
        }

        return new NaturartResponse<Client>({
            data: result,
            msg: 'Search performs successfully'
        });
    }

    async isCpfInUse(cpf: string): Promise<NaturartResponse<boolean>> {
        const result = await Client.count({where:{cpf}});

        return new NaturartResponse<boolean>({
            data: result > 0,
            msg: 'Search performs successfully'
        });
    }

    async isEmailInUse(email: string): Promise<NaturartResponse<boolean>> {
        const result = await Client.count({where:{email}});

        return new NaturartResponse<boolean>({
            data: result > 0,
            msg: 'Search performs successfully'
        });
    }

    async getByEmail(email: string): Promise<NaturartResponse<Client>> {
        if (!EmailValidator.isValid(email)) {
            return new NaturartResponse<Client>({
                isError: true,
                msg: `The email not is valid`
            })
        }

        const result = await Client.findOne({where: {email}});

        if (!result) {
            return new NaturartResponse<Client>({
                isError: true,
                msg: `Not found client with email '${email}'`
            })
        }

        return new NaturartResponse<Client>({
            data: result,
            msg: 'Search performs successfully'
        });
    }

    async getAddressesByClientId(id: number): Promise<NaturartResponse<Address[]>> {
        const result = await Address.findAll({where: {idClient: id}});

        return new NaturartResponse<Address[]>({
            data: result,
            msg: 'Search performs successfully'
        });
    }

    async getInvoicesByClientId(id: number) {
        // TODO
    }

    async login(email: string, pass: string): Promise<NaturartResponse<Client>> {
        // check for email into database.
        const result = await this.getByEmail(email);

        if (result.isError) {
            return result;
        }

        // check password.
        const {password} = result.data || {pass: ''};

        if (!(password !== pass)) {
            return new NaturartResponse<Client>({
                isError: true,
                msg: 'Invalid Login Credentials'
            });
        }

        // login
        result.msg = 'Login realized with success';

        return result;
    }

    async rememberPassword(cpf: string, email: string, password: string): Promise<NaturartResponse<void>> {
        const client = await Client.findOne({
            where: {email, cpf}
        });

        if (!client) {
            return new NaturartResponse<void>({
                isError: true,
                msg: 'Invalid Credentials'
            })
        }

        await client.update({password});
        return new NaturartResponse<void>({
            msg: 'Password successfully updated'
        });
    }

    async updatePassword(email: string, currentPassword: string, newPassword: string, confirmNewPassword: string): Promise<NaturartResponse<void>> {
        const client = await Client.findOne({
            where: {email, password: currentPassword}
        });

        if (!client) {
            return new NaturartResponse<void>({
                isError: true,
                msg: 'Invalid Credentials'
            });
        }

        if (newPassword !== confirmNewPassword) {
            return new NaturartResponse<void>({
                isError: true,
                msg: 'Password do not match'
            });
        }

        await client.update({password: newPassword});

        return new NaturartResponse<void>({
            msg: 'Password successfully updated'
        });
    }

    async validateCpf(cpf: string): Promise<NaturartResponse<boolean>> {
        if (CPFValidator.isValid(cpf)) {
            return new NaturartResponse<boolean>({
                isError: true,
                msg: 'CPF not is valid',
                data: false
            })
        }

        return new NaturartResponse<boolean>({
            isError: true,
            msg: 'CPF is valid',
            data: false
        })
    }
}

export default ClientService;