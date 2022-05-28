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
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: 'BoardsList',
    components: { },
    data() {
      return {
        breadcrumbs: [],
        boards: [],
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
        disabled: false,
        text: this.$t('boards.new'),
        to: {
          name: 'boards_new'
        },
      });
    },
    watch:{
      '$route.name': {
        handler: function(route_name) {
          console.log(route_name);
        }
      }
    },
    methods: {
    }
  };
</script>
