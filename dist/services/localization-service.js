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
exports.LocalizationService = void 0;
const abstract_service_1 = require("../abstract/abstract-service");
const localization_1 = require("../models/localization");
const sequelize_1 = require("sequelize");
const naturart_response_1 = __importDefault(require("../utils/naturart-response"));
class LocalizationService extends abstract_service_1.AbstractService {
    /**
     * Construct a new instance of entity.
     */
    constructor() {
        super(localization_1.Localization);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const localizations = yield localization_1.Localization.findAll({
                attributes: ['id', 'latitude', 'longitude', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
                include: ['product'],
            });
            return new naturart_response_1.default({
                msg: 'Search performs successfully',
                data: localizations
            });
        });
    }
    getCurrentLocationByProductId(idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const current = yield localization_1.Localization.findAll({
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
                return localizations[0];
            });
            if (!current) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined localizations to product with id '${idProduct}'`
                });
            }
            return new naturart_response_1.default({
                data: current,
                msg: 'Search performs successfully'
            });
        });
    }
    getQttByProductId(idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const quantity = yield localization_1.Localization.count({ where: { idProduct } });
            return new naturart_response_1.default({
                msg: 'Search performs successfully',
                data: quantity
            });
        });
    }
    getAllByProductId(idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const localizations = yield localization_1.Localization.findAll({
                where: { idProduct },
                attributes: ['id', 'latitude', 'longitude', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
                include: ['product'],
            });
            if (localizations.length === 0) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined localizations to product with id '${idProduct}'`
                });
            }
            return new naturart_response_1.default({
                msg: 'Search performs successfully',
                data: localizations
            });
        });
    }
    getAllByProductIdAndInterval(idProduct, startInterval, endInterval) {
        return __awaiter(this, void 0, void 0, function* () {
            const localizations = typeof endInterval === 'undefined' || endInterval === 'null' ? yield localization_1.Localization.findAll({
                where: {
                    idProduct,
                    startDate: {
                        [sequelize_1.Op.lte]: startInterval
                    }
                },
                attributes: ['id', 'latitude', 'longitude', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
                include: ['product'],
            }) : typeof startInterval === 'undefined' ? yield localization_1.Localization.findAll({
                where: {
                    idProduct,
                    endDate: {
                        [sequelize_1.Op.gte]: endInterval
                    }
                },
                attributes: ['id', 'latitude', 'longitude', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
                include: ['product'],
            }) : yield localization_1.Localization.findAll({
                where: {
                    idProduct,
                    startDate: {
                        [sequelize_1.Op.between]: [startInterval, endInterval]
                    }
                },
                attributes: ['id', 'latitude', 'longitude', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
                include: ['product'],
            });
            if (localizations.length === 0) {
                return new naturart_response_1.default({
                    isError: true,
                    msg: `Undefined localizations into interval [${startInterval}:${endInterval}] to product with id '${idProduct}'`
                });
            }
            return new naturart_response_1.default({
                msg: 'Search performs successfully',
                data: localizations
            });
        });
    }
}
exports.LocalizationService = LocalizationService;
//# sourceMappingURL=localization-service.js.map