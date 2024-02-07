const modals = {
  namespaced: true,
  state: () => ({
    isCreateModalShown: false,
    isJoinModalShown: false,
    isRoomsModalShown: false,
    isFeedbackModalShown: false,
    passwordModal: {
      isShow: false,
      password: "",
      resolvePromise: undefined,
      rejectPromise: undefined,
    },
    confirmModal: {
      isShow: false,
      title: "",
      msg: "",
      resolvePromise: undefined,
      rejectPromise: undefined,
    },
  }),
  mutations: {
    showCreateModal(state) {
      state.isCreateModalShown = true;
    },
    showJoinModal(state) {
      state.isJoinModalShown = true;
    },
    showRoomsModal(state) {
      state.isRoomsModalShown = true;
    },
    showFeedbackModal(state) {
      state.isFeedbackModalShown = true;
    },
    closeCreateModal(state) {
      state.isCreateModalShown = false;
    },
    closeJoinModal(state) {
      state.isJoinModalShown = false;
    },
    closeRoomsModal(state) {
      state.isRoomsModalShown = false;
    },
    closeFeedbackModal(state) {
      state.isFeedbackModalShown = false;
    },
  },
  actions: {
    async showModal({ state }) {
      state.passwordModal.isShow = true;
      return new Promise((resolve, reject) => {
        state.passwordModal.resolvePromise = resolve;
        state.passwordModal.rejectPromise = reject;
      });
    },
    async showConfirm({ state }, options = {}) {
      state.confirmModal.title = options.title;
      state.confirmModal.msg = options.msg;
      state.confirmModal.isShow = true;
      return new Promise((resolve, reject) => {
        state.confirmModal.resolvePromise = resolve;
        state.confirmModal.rejectPromise = reject;
      });
    },
  },
};

export default modals;
