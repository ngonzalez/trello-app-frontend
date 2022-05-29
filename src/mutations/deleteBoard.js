import gql from 'graphql-tag';

const mutation = gql`
  mutation deleteBoard(
    $itemId: String!,
  ) {
    deleteBoard(input: {
      itemId: $itemId,
    }) {
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
      itemId
    },
  });
}
