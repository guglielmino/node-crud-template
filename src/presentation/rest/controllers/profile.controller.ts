
import { Inject } from 'typescript-ioc';
import { Path } from 'typescript-rest';
import * as Joi from 'joi';
import { BaseController } from '../../../framework/presentation/rest/base.controller';
import { ProfileModel } from '../../../models/profile.model';
import { ProfileService } from '../../../services/profile.service';

@Path('/profiles')
export class ProfileController extends BaseController<ProfileModel> {

  constructor(@Inject protected profileService: ProfileService) {
    super(profileService);
  }

  public getValidationSchema(): Joi.Schema {
    return Joi.object().keys({
      name: Joi.string().required()
    });
  }

  public getEndpointPermission(): any {
    return {
      'list': true,
      'get': true,
      'create': true,
      'delete': true,
      'update': true
    };
  }

}
