import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['storeData']),
    // boards
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
      console.log(this.listBoardsBackend);
      return this.storeData.listBoardsBackend &&
             this.storeData.listBoardsBackend.response &&
             this.storeData.listBoardsBackend.response.results.length > 0
    },

    // lists
    listBoardDetails() {
      if (!this.storeData.getBoardBackend) return;
      return this.storeData.getBoardBackend.response.lists;
    },
    listBoardDetailsHasResults() {
      return this.storeData.getBoardBackend &&
             this.storeData.getBoardBackend.response &&
             this.storeData.getBoardBackend.response.lists.length > 0
    },
  },
};
