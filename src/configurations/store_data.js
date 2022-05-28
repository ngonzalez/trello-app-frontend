import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['storeData']),
    listBoardsResults() {
      if (!this.storeData.listBoardsBackend) return;
      return this.storeData.listBoardsBackend.response.results;
    },
    listBoardsCurrentPage() {
      if (!this.storeData.listBoardsBackend) return;
      return this.storeData.listBoardsBackend.response.currentPage;
    },
    listBoardsTotalPages() {
      if (!this.storeData.listBoardsBackend) return;
      return this.storeData.listBoardsBackend.response.totalPages;
    },
    listBoardsHasResults() {
      return this.storeData.listBoardsBackend &&
             this.storeData.listBoardsBackend.response &&
             this.storeData.listBoardsBackend.response.results.length > 0
    },
  },
};
