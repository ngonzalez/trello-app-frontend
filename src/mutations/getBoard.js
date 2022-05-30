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
      lists {
        id
        name
        itemId
      }
      cards {
        id
        name
        itemId
        listItemId
        desc
        due
        start
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
