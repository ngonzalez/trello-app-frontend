<template>
  <ul>
    <li v-for="item in listBoardCards" v-if="listBoardCardsHasResults">
      <slot name="item" v-bind="item" />
    </li>
  </ul>
</template>
