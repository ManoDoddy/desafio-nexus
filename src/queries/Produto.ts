import { gql } from "@apollo/client";

export const GET_PRODUTOS = gql`
  query {
    produtos {
      id,
      nome, 
      preco, 
      categoria
    }
  }
`;