import { BaseModel } from './models/base.model';
import { Abstract } from 'typescript-rest';
import { Inject } from 'typescript-ioc';
import { InsertResult, DeleteResult, UpdateResult } from 'typeorm';
import { BaseDbConnector } from './infra/database/base.db';
import { ORDER } from './order.enum';

@Abstract
export abstract class BaseRepository<TModel extends BaseModel> {

  @Inject private dbConnector: BaseDbConnector;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getModel(schema: string): any {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return Object.values(require(`../models/${schema}`))[0];
  }

  public async list(schema: string, recordsByPage: number, page: number, sort: ORDER): Promise<Array<any>> {
    return this.dbConnector.connection.getRepository(this.getModel(schema)).find({
      order: { firstName: sort },
      skip: recordsByPage * (page - 1),
      take: recordsByPage
    });
  }

  public get(schema: string, _id: string): Promise<any> {
    return this.dbConnector.connection.getRepository(this.getModel(schema)).findOne(_id);
  }

  /*
     * Return of insert method for mysql database is incorrect
     * see: https://github.com/typeorm/typeorm/issues/4922
     */
  public create(schema: string, entities: Array<TModel>): Promise<InsertResult> {
    return this.dbConnector.connection.getRepository(this.getModel(schema)).insert(entities);
  }

  public delete(schema: string, _ids: Array<any>): Promise<DeleteResult> {
    return this.dbConnector.connection.getRepository(this.getModel(schema)).delete(_ids);
  }

  public update(schema: string, _id: string, entity: TModel): Promise<UpdateResult> {
    return this.dbConnector.connection.getRepository(this.getModel(schema)).update(_id, entity);
  }

}
