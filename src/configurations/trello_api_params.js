import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['apiParams']),
    apiParams() {
      return {
        key: "1122c8fe40686014e096217769e26c15",
        token: "c003078ce8c6197d3625040e4254179f18de6673662d6ad816d16dace9eb6ddd"
      }
    }
  },
};
