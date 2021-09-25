import { BaseService } from '../framework/services/base.service';
import { ProfileModel } from '../models/profile.model';

export class ProfileService extends BaseService<ProfileModel> {

  public getSchemaName(): string {
    return 'profile.model';
  }

}
