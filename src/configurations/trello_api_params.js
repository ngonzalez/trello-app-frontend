import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['apiParams']),
    apiParams() {
      return {
        key: "API_KEY",
        token: "API_TOKEN"
      }
    }
  },
};
