<template>
  <v-card class="container">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
      </v-row>
      #show
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import getBoard from '../mutations/getBoard';
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
      // created
    },
    watch:{
      '$route.name': {
        handler: function(route_name) {
          switch (route_name) {
            case 'boards_show': {
              this.getBoardBackend(this.$route.params.id);
              this.loadBreadCrumbs();
              break;
            }
          }
        },
        deep: true,
        immediate: true,
      }
    },
    methods: {
      ...mapMutations(['setStoreData']),
      loadBreadCrumbs() {
        this.breadcrumbs = [];
        this.breadcrumbs.push({
          disabled: false,
          text: this.$t('boards.title'),
          to: {
            name: 'boards_list'
          },
        });
        if (this.storeData.getBoardBackend) {
          this.breadcrumbs.push({
            disabled: false,
            text: this.storeData.getBoardBackend.response.board.name,
            to: {
              name: 'boards_show'
            },
          });
        }
      },
      getBoardBackend(itemId) {
        getBoard({
          apollo: this.$apollo,
          itemId: itemId,
        }).then((response) => _get(response, 'data.getBoard', {}))
          .then(response => {
            if (response.success) {
              this.setStoreData({
                'getBoardBackend': {
                  response: response,
                },
              });
            } else {
              this.$toast.warning("Could not find board");
            }
          }).catch(error => {
            this.$toast.warning(error);
          });
        
      },
    }
  };
</script>
