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
                color="blue darken-2"
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
                color="blue darken-2"
                outlined
                variant="outlined"
                v-model="form.desc">
              </v-textarea>
            </div>
            <div class="form-group" style="height:300px;" align="center">
              <h5>
                {{ $t('cards.new_card_due') }}
              </h5>
              <v-text-field
                label="Due Date"
                :value="picker"
                v-model="form.due">
              </v-text-field>
              <h5>
                {{ $t('cards.new_card_start') }}
              </h5>
              <v-text-field
                label="Start Date"
                :value="picker"
                v-model="form.start">
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
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      }
    },
    created() {
      // created
    },
    watch: {
      '$route.name': {
        handler: function(route_name) {
          //
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
