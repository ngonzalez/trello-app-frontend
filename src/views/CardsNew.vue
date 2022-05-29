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
          <form class="simple_form form-horizontal">
            <div class="form-group">
              <h5>
                {{ $t('cards.new_card_title') }}
              </h5>
              <v-text-field
                v-bind:label="$t('cards.name')"
                class="pa-1 ma-1"
                color="white darken-2"
                outlined
                variant="outlined"
                v-model="form.name">
              </v-text-field>
            </div>
            <div class="form-group">
              <h5>
                {{ $t('cards.new_card_desc') }}
              </h5>
              <v-textarea
                v-bind:label="$t('cards.desc')"
                class="pa-1 ma-1"
                color="white darken-2"
                outlined
                variant="outlined"
                v-model="form.desc">
              </v-textarea>
            </div>
            <div class="form-group">
              <h5>
                {{ $t('cards.new_card_start') }}
              </h5>
              <v-text-field
                label="Start Date"
                placeholder="2022-06-01"
                v-model="form.start">
              </v-text-field>
            </div>
            <div class="form-group">
              <h5>
                {{ $t('cards.new_card_due') }}
              </h5>
              <v-text-field
                label="Due Date"
                placeholder="2022-06-01"
                v-model="form.due">
              </v-text-field>
            </div>
            <div class="text-center">
              <button
                class="btn btn-default btn btn-primary"
                @click.prevent="handleClickSubmit">
                {{ $t('cards.submit') }}
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
  import getBoard from '../mutations/getBoard';
  import getList from '../mutations/getList';
  import createCard from '../mutations/createCard';
  import _ from 'lodash';
  import _get from 'lodash/get';
  import axios from 'axios';

  export default {
    name: 'CardsNew',
    components: { },
    data() {
      return {
        breadcrumbs: [],
        form: {},
        trelloApiResponseCard: {},
      }
    },
    created() {
      // created
    },
    watch: {
      '$route.name': {
        handler: function(route_name) {
          switch (route_name) {
            case 'cards_new': {
              this.getBoardBackend(this.$route.params.id);
              this.getListBackend(this.$route.params.id, this.$route.params.listId)
              break;
            }
            case 'cards_create': {
              this.createCardBackend()
              this.$router.push({
                name: 'boards_show',
                params: { id: this.storeData.getBoardBackend.response.board.itemId },
              });
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
      getListBackend(itemId, listId) {
        getList({
          apollo: this.$apollo,
          itemId: itemId,
          listId: listId,
        }).then((response) => _get(response, 'data.getList', {}))
          .then(response => {
            if (response.success) {
              this.setStoreData({
                'getListBackend': {
                  response: response
                }
              });
              this.loadBreadCrumbs();
            }
          });
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
                  response: response
                }
              });
              this.loadBreadCrumbs();
            }
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
            name: 'boards_show',
            params: { id: this.storeData.getBoardBackend.response.board.itemId },
          },
        });
        this.breadcrumbs.push({
          disabled: true,
          text: this.storeData.getListBackend.response.list.name,
        });
        this.breadcrumbs.push({
          disabled: false,
          text: "New Card",
          to: {
            name: 'cards_new',
            params: { id: this.storeData.getBoardBackend.response.board.itemId },
          },
        });
      },
      handleClickSubmit() {
        this.createTrelloCard();
      },
      createTrelloCard() {
        axios.post("https://api.trello.com/1/cards/", _.assign({
            name: this.form.name,
            desc: this.form.desc,
            due: this.form.due,
            start: this.form.start,
            idList: this.storeData.getListBackend.response.list.itemId,
          }, this.apiParams))
          .then((response) => _get(response, 'data', {}))
          .then((response) => {
            this.trelloApiResponseCard = response;
            this.createCardBackend();
          })
      },
      createCardBackend() {
        createCard({
          apollo: this.$apollo,
          itemId: this.trelloApiResponseCard.id,
          listId: this.storeData.getListBackend.response.list.itemId,
          ...this.form,
        }).then((response) => _get(response, 'data.createBoard', {}))
          .then(response => {
            if (response.success) {
              this.$toast.info("Card created successfully");
            } else {
              this.$toast.warning("Failed to create card");
            }
          });
      }
    }
  };
</script>
