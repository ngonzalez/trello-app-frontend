<template>
  <v-card class="container">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import _ from 'lodash';
  import _get from 'lodash/get';

  export default {
    name: 'DisplayBoards',
    components: { },
    created() {
      // created
    },
    data() {
      return {
        boards: [],
      };
    },
    methods: {
    },
  };
</script>
