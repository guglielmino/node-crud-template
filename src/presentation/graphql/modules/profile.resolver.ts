import { ApolloError } from 'apollo-server-express';
import { Inject } from 'typescript-ioc';
import { ORDER } from '../../../framework/order.enum';
import { ProfileService } from '../../../services/profile.service';

class ProfileResolver {

  @Inject
  private profileService: ProfileService;

  getResolver(): any {
    return {
      Query: {
        getAllProfiles: async () => {
          try {
            return await this.profileService.list(100, 1, ORDER.DESC);
          } catch (error) {
            throw new ApolloError(error);
          }
        },
        getProfile: async (_: any, args: any) => {
          try {
            const { id }: any = args;
            return await this.profileService.get(id);
          } catch (error) {
            throw new ApolloError(error);
          }
        }
      },
      Mutation: {
        createProfile: async (_: any, args: any) => {
          try {
            const { profile }: any = args;
            const res = await this.profileService.create([profile]);
            return res;
          } catch (error) {
            throw new ApolloError(error);
          }
        }
      }
    };
  }

}

export default ProfileResolver;