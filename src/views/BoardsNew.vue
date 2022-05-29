<template>
  <v-card class="container">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="6">
          <hr class="invisible" />
          <h5>
            {{ $t('boards.new_board_title') }}
          </h5>
          <form class="simple_form form-horizontal">
            <div class="form-group">
              <v-text-field
                v-bind:label="$t('boards.name')"
                class="pa-1 ma-1"
                color="blue darken-2"
                outlined
                variant="outlined"
                clearable
                clear-icon="mdi-delete"
                @click:clear="handleClickClear"
                @keydown.enter="handleSearchFromInput"
                v-model="form.name"
                >
              </v-text-field>
            </div>
            <div class="text-center">
              <button
                class="btn btn-default btn btn-primary"
                @click.prevent="handleClickSubmit">
                {{ $t('boards.submit') }}
              </button>
            </div>
          </form>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex';
  import createBoard from '../mutations/createBoard';
  import createLists from '../mutations/createLists';
  import _ from 'lodash';
  import _get from 'lodash/get';
  import axios from 'axios';

  export default {
    name: 'BoardsNew',
    components: { },
    data() {
      return {
        breadcrumbs: [],
        form: {},
        trelloApiResponseBoard: {},
        trelloApiResponseOrganization: {},
        trelloApiResponseLists: {},
      }
    },
    created() {
      // created
    },
    watch: {
      '$data.trelloApiResponseBoard': {
        handler: function(newValue) {
          this.createBoardBackend();
        },
      },
      '$data.trelloApiResponseLists': {
        handler: function(newValue) {
          this.createListsBackend();
          this.$router.push({
            name: 'boards_list',
          });
        }
      },
      '$route.name': {
        handler: function(route_name) {
          switch (route_name) {
            case 'boards_new': {
              this.loadBreadCrumbs();
              break;
            }
            case 'boards_create': {
              this.createTrelloOrganization(this.$route.params.name);
              break;
            }
          }
        },
        deep: true,
        immediate: true,
      }
    },
    methods: {
      handleClickClear(event) {
        this.$router.push({
          name: 'boards_new',
        });
      },
      handleSearchFromInput(event) {
        this.$router.push({
          name: 'boards_create',
          params: { name: event.target.value },
        });
      },
      handleClickSubmit() {
        this.$router.push({
          name: 'boards_create',
          params: { name: this.form.name },
        });
      },
      createTrelloOrganization(name) {
        axios.post("https://api.trello.com/1/organizations/", _.assign({
            displayName: name,
          }, this.apiParams))
          .then((response) => _get(response, 'data', {}))
          .then((response) => {
            this.trelloApiResponseOrganization = response;
            this.createTrelloBoard(name);
          })
      },
      createTrelloBoard(name) {
        axios.post("https://api.trello.com/1/boards/", _.assign({
            name: name,
            idOrganization: this.trelloApiResponseOrganization.id,
          }, this.apiParams))
          .then((response) => _get(response, 'data', {}))
          .then((response) => {
            this.trelloApiResponseBoard = response;
            this.getTrelloLists();
          })
      },
      getTrelloLists() {
        axios.get("https://api.trello.com/1/boards/" + this.trelloApiResponseBoard.id + "/lists?key=" + this.apiParams.key + "&token=" + this.apiParams.token)
          .then((response) => _get(response, 'data', {}))
          .then((response) => {
            this.trelloApiResponseLists = response;
          })
      },
      createBoardBackend() {
        createBoard({
          apollo: this.$apollo,
          name: this.trelloApiResponseBoard.name,
          itemId: this.trelloApiResponseBoard.id,
          url: this.trelloApiResponseBoard.url,
          shortUrl: this.trelloApiResponseBoard.shortUrl,
        }).then((response) => _get(response, 'data.createBoard', {}))
          .then(response => {
            if (response.success) {
              this.$toast.info("Board created successfully");
            } else {
              this.$toast.warning("Failed to create board");
            }
          }).catch(error => {
            this.$toast.warning(error);
          });
      },
      createListsBackend() {
        createLists({
          apollo: this.$apollo,
          itemId: this.trelloApiResponseBoard.id,
          lists: JSON.stringify(_.map(this.trelloApiResponseLists, function(item) { return { id: item.id, name: item.name } }))
        }).then((response) => _get(response, 'data.createLists', {}))
          .then(response => {
            if (response.success) {
              this.$toast.info("Lists imported successfully");
            } else {
              this.$toast.warning("Failed to import lists");
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
          disabled: true,
          text: this.$t('boards.new')
        });
      }
    }
  };
</script>
