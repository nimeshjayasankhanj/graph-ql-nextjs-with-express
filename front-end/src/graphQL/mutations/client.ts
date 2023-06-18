import { gql } from "@apollo/client";

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: String!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export const CREATE_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;
