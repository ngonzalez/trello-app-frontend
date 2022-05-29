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
      <v-row v-if="listBoardsHasResults">
        <v-col cols="12">
          <BoardsResults>
            <template #item="{ id, name, itemId, url, shortUrl }">
              <v-list>
                <v-list-item>
                  <!-- Icon -->
                  <v-list-item-title>
                    <v-icon>mdi-folder-open</v-icon>
                  </v-list-item-title>

                  <v-list-item-title>
                    <v-chip
                      color="pink darken-2"
                      @click="handleClickDelete($event, itemId)"
                      class="ma-1"
                      x-small
                      outlined
                      label>
                      {{ $t('boards.delete') }}
                    </v-chip>
                  </v-list-item-title>

                  <!-- Name -->
                  <v-list-item-title
                    @click="handleClick($event, itemId)"
                    class="ma-2 cursorPointer">
                    {{ name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </template>
          </BoardsResults>
        </v-col>
      </v-row>
      <v-row v-if="!listBoardsHasResults" align="center" justify="center" class="noResults">
        <v-col cols="12">
          {{ $t('boards.no_results') }}
        </v-col>
      </v-row>
      <v-row v-if="listBoardsHasResults" align="center" justify="center">
        <v-col cols=12 class="ma-5 pa-5">
          <v-pagination
            color="white darken-2"
            :size="10"
            :show-first-last-page="true"
            :total-visible="10"
            v-model:model-value="listBoardsCurrentPage"
            v-model:length="listBoardsTotalPages"
            @update:modelValue="handleListBoardsFromPagination">
          </v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import BoardsResults from '../components/BoardsResults.vue';
  import listBoards from '../mutations/listBoards';
  import deleteBoard from '../mutations/deleteBoard';
  import _ from 'lodash';
  import _get from 'lodash/get';
  import axios from 'axios';

  export default {
    name: 'BoardsList',
    components: { BoardsResults },
    data() {
      return {
        breadcrumbs: [],
        defaultParams: {
          page: 1,
        },
      }
    },
    created() {
      // created
    },
    watch: {
      '$route.name': {
        handler: function(route_name) {
          switch (route_name) {
            case 'boards_list': {
              this.listBoardsBackend();
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
      handleClick(event, itemId) {
        this.$router.push({
          name: 'boards_show',
          path: '/' + itemId,
          params: { id: itemId },
        });
      },
      handleListBoardsFromPagination(event) {
        _.assign(this.defaultParams, { page: event });
        this.listBoardsBackend();
      },
      handleClickDelete(event, itemId) {
        if (confirm("Are you sure?")) {
          this.deleteTrelloBoard(itemId);
          this.deleteBoardBackend(itemId);
          this.listBoardsBackend();
        }
      },
      deleteTrelloBoard(itemId) {
        // axios.delete("https://api.trello.com/1/boards/" + itemId, this.apiParams);
      },
      deleteBoardBackend(itemId) {
        deleteBoard({ apollo: this.$apollo, itemId: itemId })
          .then((response) => _get(response, 'data.deleteBoard', {}))
          .then((response) => {
            this.$toast.info("Board deleted successfully");
          }).catch((error) => {
            this.$toast.warning('Unknown error');
          });
      },
      listBoardsBackend() {
        listBoards(_.assign({ apollo: this.$apollo }, this.defaultParams))
          .then((response) => _get(response, 'data.listBoards', {}))
          .then((response) => {
            this.setStoreData({
              'listBoardsBackend': {
                response: response
              }
            });
            this.loadBreadCrumbs();
          }).catch((error) => {
            this.$toast.warning('Unknown error');
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
          text: this.$t('boards.new'),
          to: {
            name: 'boards_new'
          },
        });
      },
    }
  };
</script>
