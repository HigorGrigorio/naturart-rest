import {AbstractService} from "../abstract/abstract-service";
import {Measurement} from "../models/measurement";
import NaturartResponse from "../utils/naturart-response";
import {Op} from "sequelize";
import {SensorTypeProduct} from "../models/sensor-type-product";
import {Product} from "../models/product";

export class MeasurementService extends AbstractService<Measurement> {
    constructor() {
        super(Measurement);
    }

    async getAll(): Promise<NaturartResponse<Measurement[]>> {
        const measurements = await Measurement.findAll({
            attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
            include: ['measurementInfo']
        })

        return new NaturartResponse<Measurement[]>({
            msg: 'Search performs successfully',
            data: measurements
        })
    }

    async getByProductId(idProduct: number): Promise<NaturartResponse<Measurement[]>> {
        const products = await SensorTypeProduct.findAll({
            where: {idProduct}
        })

        if (products.length === 0) {
            return new NaturartResponse<Measurement[]>({
                isError: true,
                msg: `Undefined types to product with id '${idProduct}'`
            });
        }

        const measurements = await Measurement.findAll({
            where: {
                idSensorTypeProduct: {
                    [Op.or]: products.map(product => product.id)
                }
            },
            attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
            include: ['measurementInfo']
        })

        return new NaturartResponse<Measurement[]>({
            data: measurements,
            msg: 'Search performs successfully'
        });
    }

    async getByProductIdAndInterval(idProduct: number, startInterval: string, endInterval: string): Promise<NaturartResponse<Measurement[]>> {
        const products = await SensorTypeProduct.findAll({
            where: {idProduct}
        })

        if (products.length === 0) {
            return new NaturartResponse<Measurement[]>({
                isError: true,
                msg: `Undefined types to product with id '${idProduct}'`
            });
        }
        const ids = products.map(product => product.id);
        const measurements = typeof startInterval === 'undefined' || startInterval === 'null' ? await Measurement.findAll({
            where: {
                idSensorTypeProduct: {
                    [Op.or]: ids
                },
                measurementDate: {
                    [Op.lte]: endInterval
                }
            },
            attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
            include: ['measurementInfo']
        }) : typeof endInterval === 'undefined' || endInterval === 'null' ? await Measurement.findAll({
            where: {
                idSensorTypeProduct: {
                    [Op.or]: ids
                },
                measurementDate: {
                    [Op.gte]: startInterval
                }
            },
            attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
            include: ['measurementInfo']
        }) : await Measurement.findAll({
            where: {
                idSensorTypeProduct: {
                    [Op.or]: ids
                },
                measurementDate: {
                    [Op.between]: [startInterval, endInterval]
                }
            },
            attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
            include: ['measurementInfo']
        });

        return new NaturartResponse<Measurement[]>({
            data: measurements,
            msg: 'Search performs successfully'
        })
    }

    async getByProductAndType(idProduct: number, idSensorType: number): Promise<NaturartResponse<Measurement[]>> {
        const stp = await SensorTypeProduct.findOne({
            where: {
                idProduct,
                idSensorType
            }
        });

        if (!stp) {
            return new NaturartResponse<Measurement[]>({
                isError: true,
                msg: `Undefined product with id '${idProduct}' and type with id '${idSensorType}'`
            });
        }

        const measurements = await Measurement.findAll({
            where: {
                idSensorTypeProduct: stp.id
            },
            attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
            include: ['measurementInfo']
        });

        return new NaturartResponse<Measurement[]>({
            data: measurements,
            msg: 'Search performs successfully'
        })
    }

    async getByProductIdAndTypeAndInterval(idProduct: number, idSensorType: number, startInterval: string, endInterval: string): Promise<NaturartResponse<Measurement[]>> {
        const stp = await SensorTypeProduct.findOne({
            where: {
                idProduct,
                idSensorType
            }
        });

        if (!stp) {
            return new NaturartResponse<Measurement[]>({
                isError: true,
                msg: `Undefined product with id '${idProduct}' and type with id '${idSensorType}'`
            });
        }

        const idSensorTypeProduct = stp.id;

        const measurements = typeof startInterval === 'undefined' || startInterval === 'null' ? await Measurement.findAll({
            where: {
                idSensorTypeProduct,
                measurementDate: {
                    [Op.lte]: endInterval
                }
            },
            attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
            include: ['measurementInfo']
        }) : typeof endInterval === 'undefined' || endInterval === 'null' ? await Measurement.findAll({
            where: {
                idSensorTypeProduct,
                measurementDate: {
                    [Op.gte]: startInterval
                }
            },
            attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
            include: ['measurementInfo']
        }) : await Measurement.findAll({
            where: {
                idSensorTypeProduct,
                measurementDate: {
                    [Op.between]: [startInterval, endInterval]
                }
            },
            attributes: ['id', 'value', 'updatedAt', 'createdAt', 'measurementDate'],
            include: ['measurementInfo']
        });

        return new NaturartResponse<Measurement[]>({
            data: measurements,
            msg: 'Search performs successfully'
        })
    }

    async getProductByMeasurementId(idMeasurement: number): Promise<NaturartResponse<Product>> {
        const measurement = await Measurement.findByPk(idMeasurement);

        if (!measurement) {
            return new NaturartResponse<Product>({
                isError: true,
                msg: `Undefined measurement with id '${idMeasurement}'`
            });
        }

        const stp = await SensorTypeProduct.findByPk(measurement.idSensorTypeProduct);

        if (!stp) {
            return new NaturartResponse<Product>({
                isError: true,
                msg: `Undefined measurement with id '${idMeasurement}'`
            });
        }

        const product = await Product.findByPk(stp.idProduct);

        if (!product) {
            return new NaturartResponse<Product>({
                isError: true,
                msg: `Undefined product with id '${stp.idProduct}'`
            });
        }

        return new NaturartResponse<Product>({
            data: product,
            msg: 'Search performs successfully'
        })
    }
}