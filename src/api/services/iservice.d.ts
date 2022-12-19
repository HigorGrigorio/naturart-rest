import {Attributes, Model, WhereOptions} from "sequelize";
import {CreationAttributes} from "sequelize";
import NaturartResponse from "../../types/utils/naturart-response";

export interface IService<M extends Model> {
    add(model: CreationAttributes<M>): Promise<NaturartResponse<M>>;

    deleteById(id: WhereOptions<Attributes<M>>): Promise<NaturartResponse<number>>;

    getAll(): Promise<NaturartResponse<M[]>>;

    getById(id: number): Promise<NaturartResponse<M>>;

    update(id: WhereOptions<Attributes<M>>, attributes: {
        [key in keyof Omit<Attributes<M>, 'id'>]?: Omit<Attributes<M>, id>[key]
    }): Promise<NaturartResponse<number>>;
}