import { makeExecutableSchema } from '@graphql-tools/schema';

import ProfileModule from './modules/profile.module';

const getAllModulesSchema = (): any => {
  const profileModule = new ProfileModule().getModule();

  return makeExecutableSchema({
    typeDefs: [profileModule.typeDefs],
    resolvers: [profileModule.resolvers]
  });
};

export default getAllModulesSchema;
