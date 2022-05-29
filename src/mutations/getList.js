import gql from 'graphql-tag';

const mutation = gql`
  mutation getList(
    $itemId: String!,
    $listId: String!,
  ) {
    getList(input: {
      itemId: $itemId,
      listId: $listId,
    }) {
      list {
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
  listId,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      itemId,
      listId,
    },
  });
}
