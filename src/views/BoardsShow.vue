<template>
  <v-card class="container">
    <v-container fluid>
      #show
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import _ from 'lodash';
  import _get from 'lodash/get';
  import axios from 'axios';

  export default {
    name: 'BoardsShow',
    components: { },
    data() {
      return {
        breadcrumbs: [],
      }
    },
    created() {
      this.breadcrumbs = [];
      this.breadcrumbs.push({
        disabled: false,
        text: this.$t('boards.title'),
        to: {
          name: 'boards_list'
        },
      });
    },
    watch:{
      '$route.name': {
        handler: function(route_name) {
        }
      }
    },
    methods: {
      ...mapMutations(['setStoreData']),
    }
  };
</script>
