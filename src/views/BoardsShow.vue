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
      <v-row v-if="listBoardDetailsHasResults">
        <v-col cols="12">
          <BoardDetails>
            <template #item="{ id, name }">
              <v-list>
                <v-list-item>
                  <v-list-item-title
                    class="ma-2 cursorPointer">
                    {{ name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <router-link :to="{ name: 'boards_list' }">
                      New Card
                    </router-link>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </template>
          </BoardDetails>
        </v-col>
      </v-row>
      <v-row v-if="!listBoardDetailsHasResults" align="center" justify="center" class="noResults">
        <v-col cols="12">
          {{ $t('boards.no_results') }}
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import BoardDetails from '../components/BoardDetails.vue';
  import getBoard from '../mutations/getBoard';
  import _ from 'lodash';
  import _get from 'lodash/get';
  import axios from 'axios';

  export default {
    name: 'BoardsShow',
    components: { BoardDetails },
    data() {
      return {
        board: {},
        trelloApiResponseBoard: {},
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
      getBoardBackend(itemId) {
        getBoard({
          apollo: this.$apollo,
          itemId: itemId,
        }).then((response) => _get(response, 'data.getBoard', {}))
          .then(response => {
            if (response.success) {
              this.setStoreData({
                'getBoardBackend': {
                  response: response
                }
              });
              console.log(this.storeData.getBoardBackend);
              this.loadBreadCrumbs();
            } else {
              this.$toast.warning("Could not find board");
            }
          }).catch(error => {
            this.$toast.warning(error);
          });
        
      },
      loadBreadCrumbs() {
        this.breadcrumbs = [];
        this.breadcrumbs.push({
          disabled: false,
          text: this.$t('boards.title'),
          to: {
            name: 'boards_list'
          },
        });
        this.breadcrumbs.push({
          disabled: false,
          text: this.storeData.getBoardBackend.response.board.name,
          to: {
            name: 'boards_show'
          },
        });
      },
    }
  };
</script>
