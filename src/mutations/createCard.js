import gql from 'graphql-tag';

const mutation = gql`
  mutation createCard(
    $name: String!,
    $itemId: String!,
    $listId: String!,
    $desc: String!,
    $due: String!,
    $start: String!,
  ) {
    createCard(input: {
      name: $name,
      itemId: $itemId,
      listId: $listId,
      desc: $desc,
      due: $due,
      start: $start
    }) {
      card {
        id
        name
        itemId
        listId
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
  listId,
  desc,
  due,
  start,
}) {
  return apollo.mutate({
    mutation,
    variables: {
      name,
      itemId,
      listId,
      desc,
      due,
      start
    },
  });
}
