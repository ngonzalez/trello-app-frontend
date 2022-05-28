import gql from 'graphql-tag';

const mutation = gql`
  mutation createBoard(
    $name: String!,
    $itemId: String!,
    $url: String!,
    $shortUrl: String!,
  ) {
    createBoard(input: {
      name: $name,
      itemId: $itemId,
      url: $url,
      shortUrl: $shortUrl,
    }) {
      board {
        id
        name
        itemId
        url
        shortUrl
      }
      success
      errors
    }
  }
`;

export default function({
  apollo,
  name,
  itemId,
  url,
  shortUrl,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      name,
      itemId,
      url,
      shortUrl
    },
  });
}
