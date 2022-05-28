import gql from 'graphql-tag';

const mutation = gql`
  mutation listBoards(
    $page: Int!,
  ) {
    listBoards(input: {
      page: $page,
    }) {
      results {
        id
        name
        itemId
        url
        shortUrl
      }
      success
      errors
      currentPage
      totalPages
    }
  }
`;

export default function({
  apollo,
  page,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      page
    },
  });
}
