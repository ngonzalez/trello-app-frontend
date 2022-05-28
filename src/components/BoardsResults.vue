<template>
  <ul>
    <li v-for="item in listBoardsResults" v-if="listBoardsHasResults">
      <slot name="item" v-bind="item" />
    </li>
  </ul>
</template>
