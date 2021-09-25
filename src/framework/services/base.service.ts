import { BaseRepository } from '../base.repository';
import { BaseModel } from '../models/base.model';
import { Inject } from 'typescript-ioc';
import { Abstract } from 'typescript-rest';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ORDER } from '../order.enum';

@Abstract
export abstract class BaseService<TModel extends BaseModel> {

  @Inject private repository: BaseRepository<TModel>;

  public abstract getSchemaName(): string;

  public async list(recordsByPage: number, page: number, sort: ORDER): Promise<Array<TModel>> {
    return this.repository.list(this.getSchemaName(), recordsByPage, page, sort);
  }

  public async get(_id: string): Promise<TModel> {
    return this.repository.get(this.getSchemaName(), _id);
  }

  public async create(entities: Array<TModel>): Promise<any> {
    return this.repository.create(this.getSchemaName(), entities);
  }

  public async delete(_ids: Array<TModel>): Promise<DeleteResult> {
    return this.repository.delete(this.getSchemaName(), _ids);
  }

  public async update(_id: string, entity: TModel): Promise<UpdateResult> {
    return this.repository.update(this.getSchemaName(), _id, entity);
  }

}
