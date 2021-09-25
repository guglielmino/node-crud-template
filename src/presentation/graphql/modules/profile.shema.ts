import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Profile {
    firstName: String
    lastName: String

  }
  type Query {
    getAllProfiles: [Profile]
    getProfile(id: String): Profile
  }
`;