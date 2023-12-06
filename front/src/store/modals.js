const modals = {
  namespaced: true,
  state: () => ({
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
