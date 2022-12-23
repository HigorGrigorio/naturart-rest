import {AbstractService} from "../abstract/abstract-service";
import {Invoice} from "../models/invoice";
import {District} from "../models/district";
import NaturartResponse from "../utils/naturart-response";

export class InvoiceService extends AbstractService<Invoice>  {
    constructor() {
        super(Invoice);
    }

    async getByInvoiceNumber(invoiceNumber: number): Promise<NaturartResponse<Invoice>>{
        const invoice = await Invoice.findOne({
            where: {invoiceNumber}
        });

        if(!invoice) {
            return new NaturartResponse<Invoice>({
                isError: true,
                msg: `Undefined invoice with number '${invoiceNumber}'`
            });
        }

        return new NaturartResponse<Invoice>({
            data: invoice,
            msg: 'Search performs successfully'
        });
    }

    async getByClientId(idClient: number): Promise<NaturartResponse<Invoice[]>> {
        const invoices = await Invoice.findAll({
            where: {idClient}
        });

        return new NaturartResponse<Invoice[]>({
            data: invoices,
            msg: 'Search performs successfully'
        });
    }

    async getQttByClientId(idClient: number): Promise<NaturartResponse<number>> {
        const invoices = await Invoice.count({
            where: {idClient}
        });

        return new NaturartResponse<number>({
            data: invoices,
            msg: 'Search performs successfully'
        });
    }

    async isInvoiceNumberInUse(invoiceNumber: number): Promise<NaturartResponse<boolean>> {
        const invoice = await Invoice.findOne({
            where: {invoiceNumber}
        });

        return new NaturartResponse<boolean>({
            data: invoice !== null,
            msg: 'Search performs successfully'
        });
    }
}