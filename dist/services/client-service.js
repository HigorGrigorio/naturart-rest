"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const abstract_service_1 = require("../abstract/abstract-service");
const client_1 = require("../models/client");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
const cpf_validator_1 = __importDefault(require("./validators/cpf-validator"));
const email_validator_1 = require("./validators/email-validator");
const product_1 = require("../models/product");
const sequelize_1 = require("sequelize");
const sensor_type_1 = require("../models/sensor-type");
class ClientService extends abstract_service_1.AbstractService {
    /**
     * Construct a new instance of entity.
     */
    constructor() {
        super(client_1.Client);
    }
    /**
     * Add a new model instance in the database.
     *
     * @param attributes. The attributes to build and save a new instance.
     * @returns {Promise<number>} A new model object.
     */
    add(attributes /* using creational attributes with abstract controller */) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate cpf.
            const { cpf } = attributes;
            if (!cpf_validator_1.default.isValid(cpf)) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: 'Invalid CPF'
                });
            }
            // validate email.
            const { email } = attributes;
            if (!email_validator_1.EmailValidator.isValid(email)) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: 'Invalid email'
                });
            }
            // hash password.
            const { password } = attributes;
            attributes.password = client_1.Client.hashPassword(password);
            const result = yield this.model.create(Object.assign({}, attributes));
            return new naturart_response_1.default({
                data: result
            });
        });
    }
    getProductsByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield product_1.Product.findAll({
                where: {
                    serialCode: {
                        [sequelize_1.Op.in]: (0, sequelize_1.literal)(`(
                    SELECT invoiceitem.serialCode 
                    FROM invoiceitem 
                    INNER JOIN invoice ON invoice.id = idInvoice
                    INNER JOIN client ON client.id = invoice.idClient AND client.email = '${email}' 
                )`)
                    }
                },
                include: [{
                        model: sensor_type_1.SensorType,
                        as: 'types',
                        through: {
                            attributes: ['id'],
                            as: 'sensorTypeItem'
                        },
                    }]
            });
            return new naturart_response_1.default({
                msg: 'Search performs successful',
                data: result
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.Client.findAll({
                attributes: {
                    exclude: ['password']
                }
            });
            return new naturart_response_1.default({
                data: result,
            });
        });
    }
    getByCpf(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cpf_validator_1.default.isValid(cpf)) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: 'The CPF is not valid.'
                });
            }
            const result = yield client_1.Client.findOne({ where: { cpf } });
            if (!result) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Not found client with cpf ${cpf}`
                });
            }
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    isCpfInUse(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.Client.count({ where: { cpf } });
            return new naturart_response_1.default({
                data: result > 0,
                msg: 'Search performs successfully'
            });
        });
    }
    isEmailInUse(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield client_1.Client.count({ where: { email } });
            return new naturart_response_1.default({
                data: result > 0,
                msg: 'Search performs successfully'
            });
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email_validator_1.EmailValidator.isValid(email)) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `The email not is valid`
                });
            }
            const result = yield client_1.Client.findOne({ where: { email }, attributes: {
                    exclude: ['password']
                } });
            if (!result) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Not found client with email '${email}'`
                });
            }
            return new naturart_response_1.default({
                data: result,
                msg: 'Search performs successfully'
            });
        });
    }
    login(email, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            // check for email into database.
            const result = yield this.getByEmail(email);
            if (result.isError || !result.data) {
                return result;
            }
            // check password.
            if (!result.data.comparePassword(pass)) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: 'Invalid Login Credentials'
                });
            }
            // login
            result.msg = 'Login realized with success';
            return result;
        });
    }
    updatePassword(email, currentPassword, newPassword, confirmNewPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getByEmail(email);
            if (response.isError || !response.data) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: 'Invalid Credentials'
                });
            }
            const client = response.data;
            if (!client.comparePassword(currentPassword)) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: 'Invalid Credentials'
                });
            }
            if (newPassword !== confirmNewPassword) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: 'Password do not match'
                });
            }
            const hashedPassword = client_1.Client.hashPassword(newPassword);
            yield client.update({ password: hashedPassword });
            yield client.save();
            return new naturart_response_1.default({
                msg: 'Password successfully updated'
            });
        });
    }
    validateCpf(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cpf_validator_1.default.isValid(cpf)) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: 'CPF not is valid',
                    data: false
                });
            }
            return new naturart_response_1.default({
                isError: true,
                msg: 'CPF is valid',
                data: false
            });
        });
    }
}
exports.ClientService = ClientService;
exports.default = ClientService;
//# sourceMappingURL=client-service.js.map