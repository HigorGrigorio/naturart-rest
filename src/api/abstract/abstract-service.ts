import { Attributes, Model, ModelStatic, WhereOptions } from "sequelize";
import { IService } from "../services/iservice";
import { CreationAttributes } from "sequelize/types/model";
import NaturartResponse from "../utils/naturart-response";

export abstract class AbstractService<M extends Model> implements IService<M> {
  /**
   * static model.
   *
   * @private
   */
  protected readonly model: ModelStatic<M>;

  /**
   * Construct a new instance of abstract entity.
   *
   * @param model A static class that represents a model.
   * @protected
   */
  protected constructor(model: ModelStatic<M>) {
    this.model = model;
  }

  /**
   * Add a new model instance in the database.
   *
   * @param attributes. The attributes to build and save a new instance.
   * @returns {Promise<number>} A new model object.
   */
  public async add(
    attributes: CreationAttributes<M>
  ): Promise<NaturartResponse<M>> {
    const result = await this.model.create({ ...attributes });

    return new NaturartResponse<M>({
      data: result,
      msg: "Persist performs successfully",
    });
  }

  /**
   * Delete an entity with base in the id.
   *
   * @param where Options to deletion match.
   * @returns {Promise<number>} The number of deleted rows.
   */
  async deleteById(
    where: WhereOptions<Attributes<M>>
  ): Promise<NaturartResponse<number>> {
    const result = await this.model.destroy({
      where,
    });

    return new NaturartResponse<number>({
      data: result,
      msg: "Deleted performs successfully",
    });
  }

  /**
   * Get All models instances from database.
   *
   * @returns {Promise<M[]>} All models.
   */
  async getAll(): Promise<NaturartResponse<M[]>> {
    const result = await this.model.findAll();

    return new NaturartResponse<M[]>({
      data: result,
      msg: "Search performs successfully",
    });
  }

  /**
   * Finds a model with base in the id.
   *
   * @param id : number Id to find.
   * @returns {Promise<M | null>} A model with base in the id.
   */
  async getById(id: number): Promise<NaturartResponse<M>> {
    const result = await this.model.findByPk(id);

    if (!result) {
      return new NaturartResponse<M>({
        isError: true,
        msg: "Undefined entity with id " + id,
      });
    }

    return new NaturartResponse<M>({
      data: result,
      msg: "Search performs successfully",
    });
  }

  /**
   * Update a model into database.
   *
   * @param where Options to update match.
   * @param attributes. The attributes to build and save a new instance.
   * @return {Promise<number>} A new instance value.
   */
  async update(
    where: WhereOptions<Attributes<M>>,
    attributes: { [key in keyof Attributes<M>]?: Attributes<M>[key] }
  ): Promise<NaturartResponse<number>> {
    const result = await this.model
      .update(attributes, {
        where,
      })
      .then((result) => result[0]);

    return new NaturartResponse<number>({
      data: result,
      msg: "Search performs successfully",
    });
  }
}
