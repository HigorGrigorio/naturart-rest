import {Json} from "sequelize/types/utils";
import {JSONB} from "sequelize";

export type Data<TObject> = TObject;

export class NaturartResponse<TObject> {
    /**
     * True in only case of error.
     */
    isError: boolean;

    /**
     * Message of response.
     */
    msg?: string;

    /**
     * Data of response.
     */
    data?: Data<TObject>;

    code?: number;

    /**
     * Response constructor
     */
    constructor(props?: { data?: Data<TObject>, isError?: boolean, msg?: string, code?: number }) {
        this.isError = props?.isError ?? false;
        this.code = props?.code ?? this.isError ? 400 : 200;
        this.data = props?.data;
        this.msg = props?.msg;
    }
}

export default NaturartResponse;
