import gql from 'graphql-tag';

const mutation = gql`
  mutation createCard(
    $name: String!,
    $itemId: String!,
    $listItemId: String!,
    $desc: String!,
    $due: String!,
    $start: String!,
  ) {
    createCard(input: {
      name: $name,
      itemId: $itemId,
      listItemId: $listItemId,
      desc: $desc,
      due: $due,
      start: $start
    }) {
      card {
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
  name,
  itemId,
  listItemId,
  desc,
  due,
  start,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      name,
      itemId,
      listItemId,
      desc,
      due,
      start
    },
  });
}
