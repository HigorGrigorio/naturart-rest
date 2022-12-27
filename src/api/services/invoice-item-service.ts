import {AbstractService} from "../abstract/abstract-service";
import {InvoiceItem} from "../models/invoice-item";
import NaturartResponse from "../utils/naturart-response";
import Localization from "../models/localization";
import {LocalizationService} from "./localization-service";

export class InvoiceItemService extends AbstractService<InvoiceItem> {
    constructor() {
        super(InvoiceItem);
    }

    async getCurrentLocalizationByProductId(idProduct: number): Promise<NaturartResponse<Localization>> {
        return await (new LocalizationService()).getCurrentLocationByProductId(idProduct);
    }

    async getLocationsByProductId(idProduct: number): Promise<NaturartResponse<Localization[]>> {
        return await (new LocalizationService()).getAllByProductId(idProduct);
    }

    async getQttLocationsByProductId(idProduct: number): Promise<NaturartResponse<number>> {
        return await (new LocalizationService()).getQttByProductId(idProduct);
    }
}