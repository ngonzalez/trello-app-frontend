import gql from 'graphql-tag';

const mutation = gql`
  mutation createLists(
    $itemId: String!,
    $lists: JSON!
  ) {
    createLists(input: {
      itemId: $itemId,
      lists: $lists
    }) {
      success
      errors
    }
  }
`;

export default function({
  apollo,
  itemId,
  lists
}) {
  return apollo.mutate({
    mutation,
    variables: {
      itemId,
      lists
    },
  });
}
