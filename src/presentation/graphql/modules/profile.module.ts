import { typeDefs } from './profile.schema';
import ProfileResolver from './profile.resolver';

class ProfileModule {

  getModule(): any {
    return {
      name: 'profile',
      typeDefs,
      resolvers: new ProfileResolver().getResolver()
    };
  }

}

export default ProfileModule;