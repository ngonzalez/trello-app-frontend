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
  import _ from 'lodash';
  import _get from 'lodash/get';
  import axios from 'axios';

  export default {
    name: 'BoardsNew',
    components: { },
    data() {
      return {
        breadcrumbs: [],
        errors: [],
        form: {},
      }
    },
    created() {
      this.breadcrumbs = [];
      this.breadcrumbs.push({
        disabled: false,
        text: this.$t('boards.title'),
        to: {
          name: 'boards'
        },
      });
      this.breadcrumbs.push({
        disabled: true,
        text: this.$t('boards.new')
      });
    },
    watch:{
      '$route.name': {
        handler: function(route_name) {
          console.log(route_name);
          switch (route_name) {
            // Boards
            case 'boards': {
              const name = this.$route.params.name;
              const params = {
                key: "API_KEY",
                token: "API_TOKEN"
              };

              axios.post("https://api.trello.com/1/organizations/", _.assign({
                  displayName: name,
                }, params))
                .then((response) => _get(response, 'data', {}))
                .then((response) => {
                  this.setStoreData({
                    'trelloApiResponseOrganization': {
                      response: response,
                    },
                  });
                })

              axios.post("https://api.trello.com/1/boards/", _.assign({
                  name: name,
                  idOrganization: this.storeData.trelloApiResponseOrganization.response.id,
                }, params))
                .then((response) => _get(response, 'data', {}))
                .then((response) => {
                  this.setStoreData({
                    'trelloApiResponseBoard': {
                      response: response,
                    },
                  });
                })

              createBoard({
                apollo: this.$apollo,
                name: this.storeData.trelloApiResponseBoard.response.name,
                itemId: this.storeData.trelloApiResponseBoard.response.id,
                url: this.storeData.trelloApiResponseBoard.response.url,
                shortUrl: this.storeData.trelloApiResponseBoard.response.shortUrl,
              }).then((response) => _get(response, 'data.createBoard', {}))
                .then(response => {
                  if (response.success) {
                    this.setStoreData({
                      'backendResponseBoard': {
                        response: response,
                      },
                    });
                    this.$toast.info("Board created successfully");
                  } else {
                    this.$toast.warning("Failed to create board");
                  }
                }).catch(error => {
                  this.$toast.warning(error);
                });

              console.log(this.storeData);

              break;
            }
          }
        }
      }
    },
    methods: {
      ...mapMutations(['setStoreData']),
      handleClickClear(event) {
        console.log('handleClickClear');
        this.$router.push({
          name: 'boards_new',
        });
      },
      handleSearchFromInput(event) {
        console.log('handleSearchFromInput');
        this.$router.push({
          name: 'boards',
          params: { name: event.target.value },
        });
      },
      handleClickSubmit() {
        console.log('handleClickSubmit');
        console.log(this.form);
        this.$router.push({
          name: 'boards',
          params: { name: this.form.name },
        });
      },
    }
  };
</script>
