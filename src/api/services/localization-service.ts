import {AbstractService} from "../abstract/abstract-service";
import {Localization} from "../models/localization";
import {Op} from "sequelize";
import NaturartResponse from "../utils/naturart-response";
import naturartResponse from "../utils/naturart-response";

export class LocalizationService extends AbstractService<Localization> {
    /**
     * Construct a new instance of entity.
     */
    constructor() {
        super(Localization);
    }

    async getAll(): Promise<NaturartResponse<Localization[]>> {
        const localizations = await Localization.findAll({
            attributes: ['id', 'latitude', 'longitude', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
            include: ['product'],
        });
        return new NaturartResponse<Localization[]>({
            msg: 'Search performs successfully',
            data: localizations
        });
    }

    async getCurrentLocationByProductId(idProduct: number): Promise<NaturartResponse<Localization>> {
        const current = await Localization.findAll({
            where: {
                idProduct
            },
            order: ['startDate'],
            attributes: ['id', 'latitude', 'longitude', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
            include: ['product'],
        }).then(localizations => {
            if (localizations.length === 0) {
                return null;
            }
            return localizations[0]
        });

        if (!current) {
            return new NaturartResponse<Localization>({
                isError: true,
                msg: `Undefined localizations to product with id '${idProduct}'`
            });
        }

        return new NaturartResponse<Localization>({
            data: current,
            msg: 'Search performs successfully'
        });
    }

    async getQttByProductId(idProduct: number): Promise<NaturartResponse<number>> {
        const quantity = await Localization.count({where: {idProduct}});

        return new NaturartResponse<number>({
            msg: 'Search performs successfully',
            data: quantity
        });
    }

    async getAllByProductId(idProduct: number): Promise<NaturartResponse<Localization[]>> {
        const localizations = await Localization.findAll({
            where: {idProduct},
            attributes: ['id', 'latitude', 'longitude', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
            include: ['product'],
        });

        if (localizations.length === 0) {
            return new NaturartResponse<Localization[]>({
                isError: true,
                msg: `Undefined localizations to product with id '${idProduct}'`
            })
        }

        return new NaturartResponse<Localization[]>({
            msg: 'Search performs successfully',
            data: localizations
        });
    }

    async getAllByProductIdAndInterval(idProduct: number, startInterval: string, endInterval: string): Promise<NaturartResponse<Localization[]>> {
        const localizations = typeof endInterval === 'undefined' || endInterval === 'null' ? await Localization.findAll({
            where: {
                idProduct,
                startDate: {
                    [Op.lte]: startInterval
                }
            },
            attributes: ['id', 'latitude', 'longitude', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
            include: ['product'],
        }) : typeof startInterval === 'undefined' ? await Localization.findAll({
            where: {
                idProduct,
                endDate: {
                    [Op.gte]: endInterval
                }
            },
            attributes: ['id', 'latitude', 'longitude', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
            include: ['product'],
        }) : await Localization.findAll({
            where: {
                idProduct,
                startDate: {
                    [Op.between]: [startInterval, endInterval]
                }
            },
            attributes: ['id', 'latitude', 'longitude', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
            include: ['product'],
        })

        if (localizations.length === 0) {
            return new NaturartResponse<Localization[]>({
                isError: true,
                msg: `Undefined localizations into interval [${startInterval}:${endInterval}] to product with id '${idProduct}'`
            })
        }

        return new NaturartResponse<Localization[]>({
            msg: 'Search performs successfully',
            data: localizations
        });
    }
}