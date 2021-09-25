import Joi = require('joi');
import { Abstract, DELETE, Errors, GET, Path, PathParam, POST, PUT, Return } from 'typescript-rest';
import { BaseModel } from '../../models/base.model';
import { BaseService } from '../../services/base.service';
import { ORDER } from '../../order.enum';

@Abstract
export abstract class BaseController<TModel extends BaseModel> {

  constructor(private service: BaseService<TModel>) { }

  public abstract getValidationSchema(): Joi.Schema;
  public abstract getEndpointPermission(): any;

  @GET
  @Path('/:recordsByPage/:page/:sort')
  protected async list(
    @PathParam('recordsByPage') recordsByPage: number,
      @PathParam('page') page: number,
      @PathParam('sort') sort: ORDER
  ): Promise<Array<TModel>> {
    if (this.getEndpointPermission().list) {
      const res = await this.service.list(
        recordsByPage,
        page,
        sort
      );
      return res;
    } else {
      throw new Errors.UnauthorizedError('Unauthorized route');
    }
  }

  @GET
  @Path('/:id')
  protected async get(@PathParam('id') _id: string): Promise<TModel> {
    if (this.getEndpointPermission().get) {
      return this.service.get(_id);
    } else {
      throw new Errors.UnauthorizedError('Unauthorized route');
    }
  }

  @POST
  protected async create(entities: Array<TModel>): Promise<Return.NewResource<any>> {
    if (this.getEndpointPermission().create) {
      try {
        await this.validateEntity(entities);
      } catch (err) {
        throw new Errors.BadRequestError(JSON.stringify(err));
      }
      const insertResult = await this.service.create(entities);
      return new Return.NewResource('apis/create', {
        'insertedCount': insertResult.identifiers.length,
        'insertedIds': insertResult.identifiers
      });
    } else {
      throw new Errors.UnauthorizedError('Unauthorized route');
    }
  }

  @DELETE
  protected async delete(_ids: Array<TModel>): Promise<Return.NewResource<any>> {
    if (this.getEndpointPermission().delete) {
      const deleteResult = await this.service.delete(_ids);
      return new Return.NewResource('apis/delete', {
        'deletedCount': deleteResult.affected
      });
    } else {
      throw new Errors.UnauthorizedError('Unauthorized route');
    }
  }

  @PUT
  @Path('/:id')
  protected async update(@PathParam('id') _id: string, entity: TModel): Promise<Return.NewResource<any>> {
    if (this.getEndpointPermission().update) {
      try {
        await this.validateEntity([entity]);
      } catch (err) {
        throw new Errors.BadRequestError(JSON.stringify(err));
      }

      const updateResult = await this.service.update(_id, entity);
      return new Return.NewResource('apis/update', {
        'affected': updateResult.affected
      });
    } else {
      throw new Errors.UnauthorizedError('Unauthorized route');
    }
  }


  protected async validateEntity(entities: Array<TModel>): Promise<Array<TModel>> {
    const schema: Joi.Schema = this.getValidationSchema();
    if (!schema) {
      return entities;
    }
    const promises = entities.map(entity => {
      const res = schema.validate(entity);
      if (res.error) {
        throw res.error;
      } else {
        return res.value;
      }
    });
    return Promise.all(promises).then();
  }

}
