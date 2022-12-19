import {AbstractService} from "../abstract/abstract-service";
import {ZipCode} from "../models/zip-code";
import NaturartResponse from "../utils/naturart-response";
import {City} from "../models/city";
import {District} from "../models/district";
import {Street} from "../models/street";
import {StreetCity} from "../models/street-city";
import {StreetType} from "../models/street-type";
import {State} from "../models/state";
import {AttributeExtractor} from "../utils/attribute-extractor";
import {StateService} from "./state-service";
import {DistrictService} from "./district-service";
import {CityService} from "./city-service";
import {DistrictCityService} from "./district-city-service";
import {StreetService} from "./street-service";
import {StreetCityService} from "./street-city-service";
import fetch from 'cross-fetch';

export class ZipCodeService extends AbstractService<ZipCode> {
    constructor() {
        super(ZipCode);
    }

    /**
     * Get All models instances from database.
     *
     * @returns {Promise<ZipCode[]>} All models.
     */
    async getAll(): Promise<NaturartResponse<ZipCode[]>> {
        const result = await ZipCode.findAll({
            attributes: ['id', 'createdAt', 'updatedAt', 'code'],
            include: [{
                attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                model: City,
                as: 'city',
                include: [{
                    attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                    model: State,
                    as: 'state'
                }, {
                    model: District,
                    as: 'districts',
                    through: {attributes: []}
                }]
            }, {
                attributes: ['id', 'idCity', 'createdAt', 'updatedAt'],
                model: StreetCity,
                as: 'streetInfo',
                include: [{
                    model: Street,
                    as: 'street'
                }, {
                    model: StreetType,
                    as: 'streetType'
                }]
            }]
        });

        return new NaturartResponse<ZipCode[]>({
            data: result,
            msg: 'Search performs successfully'
        })
    }

    /**
     * Finds a model with base in the id.
     *
     * @param id : number Id to find.
     * @returns {Promise<ZipCode>} A model with base in the id.
     */
    async getById(id: number): Promise<NaturartResponse<ZipCode>> {
        const result = await ZipCode.findByPk(id, {
            attributes: ['id', 'createdAt', 'updatedAt', 'code'],
            include: [{
                attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                model: City,
                as: 'city',
                include: [{
                    attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                    model: State,
                    as: 'state'
                }, {
                    model: District,
                    as: 'districts',
                    through: {attributes: []}
                }]
            }, {
                attributes: ['id', 'idCity', 'createdAt', 'updatedAt'],
                model: StreetCity,
                as: 'streetInfo',
                include: [{
                    model: Street,
                    as: 'street'
                }, {
                    model: StreetType,
                    as: 'streetType'
                }]
            }]
        });

        if (!result) {
            return new NaturartResponse<ZipCode>({
                isError: true,
                msg: `Undefined error with id '${id}'.`
            });
        }

        return new NaturartResponse<ZipCode>({
            data: result,
            msg: 'Search performs successfully'
        });
    }

    /**
     * Get districts with base in the cep number.
     *
     * @param code
     */
    async getDistrictsByCepNumber(code: string): Promise<NaturartResponse<District[]>> {
        const [results, metadata] = await ZipCode.sequelize?.query(`
            SELECT  
                \`District\`.\`id\`,
                \`District\`.\`name\`,
                \`District\`.\`createdAt\`,
                \`District\`.\`updatedAt\`
            FROM
                \`District\` AS \`District\`,
                \`ZipCode\` AS \`ZipCode\`,
                \`DistrictCity\` AS \`DistrictCity\`
            WHERE 
                \`ZipCode\`.\`code\` = ${code}
                AND \`ZipCode\`.\`idDistrictCity\` = \`DistrictCity\`.\`id\` 
                AND \`DistrictCity\`.\`idDistrict\` = \`District\`.\`id\`
        `) ?? [[], 0]


        if (results.length == 0) {
            return new NaturartResponse({
                isError: true,
                msg: `Undefined cep with code '${code}'`
            });
        }

        return new NaturartResponse({
            data: Object.values(results).map(value => (new District).setAttributes(
                AttributeExtractor.extract(value, {all: true})
            )),
            msg: 'Search performs successfully'
        });
    }

    /**
     * Get streets by cep number.
     *
     * @param code
     */
    async getStreetsByCepNumber(code: string): Promise<NaturartResponse<Street[]>> {
        const [results, metadata] = await ZipCode.sequelize?.query(`
            SELECT  
                \`Street\`.\`id\`,
                \`Street\`.\`name\`,
                \`Street\`.\`createdAt\`,
                \`Street\`.\`updatedAt\`
            FROM
                \`Street\` AS \`Street\`,
                \`ZipCode\` AS \`ZipCode\`,
                \`StreetCity\` AS \`StreetCity\`
            WHERE 
                \`ZipCode\`.\`code\` = ${code}
                AND \`ZipCode\`.\`idStreetCity\` = \`StreetCity\`.\`id\` 
                AND \`StreetCity\`.\`idStreet\` = \`Street\`.\`id\`
        `) ?? [[], 0];

        return new NaturartResponse({
            data: Object.values(results).map(value => (new Street).setAttributes(
                AttributeExtractor.extract(value, {all: true})
            )),
            msg: 'Search performs successfully'
        });
    }

    /**
     * Get a cep with base in the number.
     *
     * @param code
     */
    async getByNumber(code: string): Promise<NaturartResponse<ZipCode[]>> {
        code = code.replace(/\D/g, '');
        if (await ZipCode.count({where: {code}}) == 0) {
                const response = await fetch(`https://viacep.com.br/ws/${code}/json/`);
                const body = await response.json();
                    if (!('error' in body)) {
                        const {cep, logradouro, complemento, bairro, localidade, uf} = body;
                        const states: { [key: string]: string } = {
                            AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas',
                            BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo',
                            GO: 'Goiás', MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul',
                            MG: 'Minas Gerais', PA: 'Pará', PB: 'Paraíba', PR: 'Paraná',
                            PE: 'Pernambuco', PI: 'Piauí', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte',
                            RS: 'Rio Grande do Sul', RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina',
                            SP: 'São Paulo', SE: 'Sergipe', TO: 'Tocantins'
                        };

                        // Inserts a new cep on database.
                        let idState: number | null;
                        let idDistrict: number | null;
                        let idCity: number | null;
                        let idDistrictCity: number | null;
                        let idStreet: number | null;
                        let idStreetCity: number = 0;

                        // Inserts UF if not exists.
                        const stateService = new StateService();
                        if (!(await stateService.isInitialsInUse(uf)).data) {
                            idState = await stateService.add({
                                name: states[uf],
                                initials: uf
                            }).then(obj => obj.data?.id) || 0;
                        } else {
                            idState = await stateService.getByInitials(uf).then(obj => obj.data?.at(0)?.id) || 0;
                        }

                        // Inserts district if not exits.
                        const districtService = new DistrictService();
                        if (!(await districtService.isNameInUse(bairro)).data) {
                            idDistrict = await districtService.add({name: bairro}).then(obj => obj.data?.id) || 0;
                        } else {
                            idDistrict = await districtService.getByName(bairro).then(obj => obj.data?.at(0)?.id) || 0;
                        }

                        // Inserts city if not exits.
                        const cityService = new CityService();
                        if (!(await cityService.isNameInUse(localidade)).data) {
                            idCity = await cityService.add({name: localidade, idState}).then(obj => obj.data?.id) || 0;
                        } else {
                            idCity = await cityService.getByName(localidade).then(obj => obj.data?.at(0)?.id) || 0;
                        }

                        // Binds the city with de district.
                        const districtCityService = new DistrictCityService();
                        if (!(await districtCityService.getByNameAndCityId(localidade, idCity)).data) {
                            idDistrictCity = await districtCityService.add({
                                idCity,
                                idDistrict
                            }).then(obj => obj.data?.id) || 0;
                        } else {
                            idDistrictCity = await districtCityService.getByNameAndCityId(localidade, idCity).then(obj => obj.data?.at(0)?.id) || 0;
                        }

                        // Inserts street if not exists.
                        if (logradouro.length > 0) {
                            const streetService = new StreetService();
                            if (!(await streetService.isNameInUse(logradouro)).data) {
                                idStreet = (await streetService.add({name: logradouro})).data?.id || null;
                            } else {
                                idStreet = (await streetService.getByName(logradouro)).data?.at(0)?.id || null;
                            }

                            if (idStreet) {
                                const streetCityService = new StreetCityService();
                                if (!(await streetCityService.isNameInUse(logradouro, idCity)).data) {
                                    idStreetCity = (await streetCityService.add({idCity, idStreet})).data?.id || 0;
                                } else {
                                    idStreetCity = (await streetCityService.getByNameAndCityId(logradouro, idCity)).data?.id || 0;
                                }
                            }
                        } else {
                            idStreetCity = 0;
                        }

                        if (idStreetCity != null && idStreetCity > 0) {
                            await ZipCode.create({idDistrictCity, idCity, code, idStreetCity});
                        } else {
                            await ZipCode.create({idDistrictCity, idCity, code});
                        }
                    }
                }


        const result = await ZipCode.findAll({
            where: {
                code
            },
            attributes: ['id', 'createdAt', 'updatedAt', 'code'],
            include: [{
                attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                model: City,
                as: 'city',
                include: [{
                    attributes: ['id', 'name', 'createdAt', 'updatedAt'],
                    model: State,
                    as: 'state'
                }, {
                    model: District,
                    as: 'districts',
                    through: {attributes: []}
                }]
            }, {
                attributes: ['id', 'idCity', 'createdAt', 'updatedAt'],
                model: StreetCity,
                as: 'streetInfo',
                include: [{
                    model: Street,
                    as: 'street'
                }, {
                    model: StreetType,
                    as: 'streetType'
                }]
            }]
        });

        if (!result) {
            return new NaturartResponse<ZipCode[]>({
                isError: true,
                msg: `Undefined error with id '${code}'.`
            });
        }

        return new NaturartResponse<ZipCode[]>({
            data: result,
            msg: 'Search performs successfully'
        });
    }
}

export default ZipCodeService
