import { gql } from 'apollo-server-express';

export const typeDefs = gql`

  interface IProfile {
    id: ID
    firstName: String
    lastName: String
  }

  type Profile implements IProfile {
    id: ID
    firstName: String
    lastName: String
  }

  type Query {
    getAllProfiles: [Profile]
    getProfile(id: String): Profile
  }

  input  ProfileInput {
    firstName: String
    lastName: String
  }

  type Mutation {
    createProfile(profile: ProfileInput): String
  }
`;