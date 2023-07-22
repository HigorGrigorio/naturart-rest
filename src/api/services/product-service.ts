import {AbstractService} from "../abstract/abstract-service";
import {Product} from "../models/product";
import NaturartResponse from "../utils/naturart-response";
import {SensorType} from "../models/sensor-type";
import {SensorTypeProduct} from "../models/sensor-type-product";
import {Attributes, Op, WhereOptions} from "sequelize";
import {CreationAttributes} from "sequelize/types/model";
import {InvoiceItem} from "../models/invoice-item";

export class ProductService extends AbstractService<Product> {
    constructor() {
        super(Product);
    }

    async add(attributes: CreationAttributes<Product>): Promise<NaturartResponse<Product>> {
        const {serialCode, name} = attributes;

        // check if serial code is valid.
        const item = await InvoiceItem.findOne({where: {serialCode}});

        if (!item) {
            return new NaturartResponse<Product>({
                isError: true,
                msg: `Undefined invoice item with serial code '${serialCode}'`
            });
        }

        const idInvoiceItem = item.id;

        const result = await this.model.create({serialCode, idInvoiceItem, name});

        return new NaturartResponse<Product>({
            data: result,
            msg: 'Persist performs successfully'
        });
    }

    async update(where: WhereOptions<Attributes<Product>>, attributes: { [key in keyof Attributes<Product>]?: Attributes<Product>[key] }): Promise<NaturartResponse<number>> {
        const {serialCode, name} = attributes;

        // check if serial code is valid.
        const item = await InvoiceItem.findOne({where: {serialCode}});

        if (!item) {
            return new NaturartResponse<number>({
                isError: true,
                msg: `Undefined invoice item with serial code '${serialCode}'`
            });
        }

        const idInvoiceItem = item.id;

        const result = await this.model.update(
            {
                idInvoiceItem,
                name,
                serialCode,
            }
            , {
                where
            }).then(result => result[0])

        return new NaturartResponse<number>({
            data: result,
            msg: 'Search performs successfully'
        })
    }

    async getBySerialCode(serialCode: string): Promise<NaturartResponse<Product>> {
        const product = await Product.findOne({
            where: {serialCode},
            include: [{
                model: SensorType,
                attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                through: {
                    attributes: ['id'],
                    as: 'sensorTypeItem'
                },
                as: 'types'
            }],

        });

        if (!product) {
            return new NaturartResponse<Product>({
                isError: true,
                msg: `Undefined product with serial code '${serialCode}'`
            });
        }

        return new NaturartResponse<Product>({
            data: product,
            msg: 'Search performs successfully'
        })
    }

    async getQttBySensorTypeId(idSensorType: number): Promise<NaturartResponse<number>> {
        const quantity = await SensorTypeProduct.count({
            where: {idSensorType}
        });

        return new NaturartResponse({
            data: quantity,
            msg: 'Search performs successfully'
        });
    }

    async getTypeByProductId(id: number): Promise<NaturartResponse<SensorType[]>> {
        const stps = await SensorTypeProduct.findAll({
            where: {
                idProduct: id
            }
        });

        if (stps.length == 0) {
            return new NaturartResponse<SensorType[]>({
                isError: true,
                msg: `Undefined types for product with id '${id}'`
            })
        }

        const ids = stps.map(val => val.idSensorType);

        const types = await SensorType.findAll({
            where: {
                id: {
                    [Op.or]: ids
                }
            }
        });

        return new NaturartResponse<SensorType[]>({
            data: types,
            msg: 'Search performs successfully',
        });
    }

    async getByName(name: string): Promise<NaturartResponse<Product>> {
        const product = await Product.findOne({
            where: {name},
            include: [SensorType]
        });

        if (!product) {
            return new NaturartResponse<Product>({
                isError: true,
                msg: `Undefined product with name '${name}'`
            })
        }

        return new NaturartResponse<Product>({
            data: product,
            msg: 'Search performs successfully',
        });
    }

    async isNameInUse(name: string): Promise<NaturartResponse<boolean>> {
        const result = await Product.count({
            where: {name}
        }) > 0;

        return new NaturartResponse<boolean>({
            data: result,
            msg: 'Search performs successfully'
        });
    }

    async isSerialCodeInUse(serialCode: string): Promise<NaturartResponse<boolean>> {
        const result = await Product.count({
            where: {serialCode}
        }) > 0;

        return new NaturartResponse<boolean>({
            data: result,
            msg: 'Search performs successfully',
        });
    }
}