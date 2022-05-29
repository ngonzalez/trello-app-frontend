import gql from 'graphql-tag';

const mutation = gql`
  mutation getBoard(
    $itemId: String!,
  ) {
    getBoard(input: {
      itemId: $itemId,
    }) {
      board {
        id
        name
        itemId
      }
      success
      errors
    }
  }
`;

export default function({
  apollo,
  itemId,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      itemId,
    },
  });
}
