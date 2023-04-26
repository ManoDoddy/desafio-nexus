import { gql } from "@apollo/client";

export const GET_PRODUTOS = gql`
  query ($categoria: [String]) {
    produtos(categoria: $categoria) {
      id,
      nome, 
      preco, 
      categoria {
        descricao
      }
    }
  }
`;