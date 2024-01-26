const notification = {
  namespaced: true,
  state: () => ({
    notifications: [],
    timer: undefined,
  }),
  getters: {
    isEmpty(state) {
      return !state.notifications.length > 0;
    },
    getType(state, getters) {
      return !getters.isEmpty ? state.notifications[0].type : null;
    },
    getMsg(state, getters) {
      return !getters.isEmpty ? state.notifications[0].msg : null;
    },
    getDisappearTime(state, getters) {
      return !getters.isEmpty ? state.notifications[0].disappearTime : null;
    },
    getIcon(state, getters) {
      switch (getters.getType) {
        case "error":
          return "material-symbols:error-outline";
        case "info":
          return "material-symbols:info-outline";
        case "warning":
          return "material-symbols:warning-outline";
        case "success":
          return "clarity:success-standard-line";
        case "default":
          return null;
      }
    },
    getClass(state, getters) {
      switch (getters.getType) {
        case "error":
          return "bg-red-600";
        case "info":
          return "bg-sky-600";
        case "warning":
          return "bg-yellow-400";
        case "success":
          return "bg-green-600";
      }
    },
  },
  mutations: {
    addNotification(state, { type, msg, disappearTime = 10000 }) {
      this.commit("notification/closeNotification");
      state.notifications.push({ type, msg, disappearTime });
      state.timer = setTimeout(() => {
        this.commit("notification/closeNotification");
      }, disappearTime);
    },
    closeNotification(state) {
      clearTimeout(state.timer);
      if (state.notifications.length > 0) {
        state.notifications.shift();
      }
    },
  },
};

export default notification;
