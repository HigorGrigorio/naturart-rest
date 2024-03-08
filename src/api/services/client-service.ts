import {AbstractService} from "../abstract/abstract-service";
import {Client} from "../models/client";
import NaturartResponse from "../utils/naturart-response";
import CPFValidator from "./validators/cpf-validator";
import {EmailValidator} from "./validators/email-validator";
import {CreationAttributes} from "sequelize/types/model";
import {Product} from "../models/product";
import {literal, Op} from "sequelize";
import {SensorType} from "../models/sensor-type";
import {Invoice} from "../models/invoice";
import {InvoiceItem} from "../models/invoice-item";


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

        if (!CPFValidator.isValid(cpf)) {
            return new NaturartResponse<Client>({
                isError: true,
                msg: 'Invalid CPF'
            });
        }

        // validate email.
        const {email} = attributes;

        if (!EmailValidator.isValid(email)) {
            return new NaturartResponse<Client>({
                isError: true,
                msg: 'Invalid email'
            });
        }

        //Hashing Password
        const {password, ...rest} = attributes;
        var newPassword = Client.hashPassword(password)

        const result = await this.model.create({...rest, password: newPassword});

        return new NaturartResponse<Client>({
            data: result
        });
    }

    async getProductsByEmail(email: string): Promise<NaturartResponse<Product[]>> {
        const result = await Product.findAll({
            where: {
                serialCode: {
                    [Op.in]: literal(`(
                    SELECT invoiceitem.serialCode 
                    FROM invoiceitem 
                    INNER JOIN invoice ON invoice.id = idInvoice
                    INNER JOIN client ON client.id = invoice.idClient AND client.email = '${email}' 
                )`)
                }
            },
            include: [{
                model: SensorType,
                as: 'types',
                through: {
                    attributes: ['id'],
                    as: 'sensorTypeItem'
                },
            }]
        })

        return new NaturartResponse<Product[]>({
            msg: 'Search performs successful',
            data: result
        })
    }

    async getAll(): Promise<NaturartResponse<Client[]>> {
        const result = await Client.findAll({
            attributes: {
                exclude: ['password']
            }
        })

        return new NaturartResponse<Client[]>({
            data: result,
        })
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
        const result = await Client.count({where: {cpf}});

        return new NaturartResponse<boolean>({
            data: result > 0,
            msg: 'Search performs successfully'
        });
    }

    async isEmailInUse(email: string): Promise<NaturartResponse<boolean>> {
        const result = await Client.count({where: {email}});

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

    async login(email: string, pass: string): Promise<NaturartResponse<Client>> {
        // check for email into database.
        const result = await this.getByEmail(email);

        if (result.isError || !result.data) {
            return result;
        }

        // check password.
        if (!result.data.passwordMatch(pass)) {
            return new NaturartResponse<Client>({
                isError: true,
                msg: 'Invalid Login Credentials'
            });
        }

        // login
        result.msg = 'Login realized with success';

        return result;
    }

    async updatePassword(email: string, currentPassword: string, newPassword: string, confirmNewPassword: string): Promise<NaturartResponse<void>> {
        const response = await this.getByEmail(email);

        if (response.isError || !response.data) {
            return new NaturartResponse<void>({
                isError: true,
                msg: 'Invalid Credentials'
            });
        }

        const client = response.data;

        if (!client.passwordMatch(currentPassword)) {
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

        const hashedPassword = Client.hashPassword(newPassword);

        await client.update({password: hashedPassword});
        await client.save();

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
