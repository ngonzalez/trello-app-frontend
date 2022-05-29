<template>
  <ul>
    <li v-for="item in listBoardDetails" v-if="listBoardDetailsHasResults">
      <slot name="item" v-bind="item" />
    </li>
  </ul>
</template>
