import Module from 'vuex';
import { Notification, NotificationState } from '@/types/modules/notification';
import { NOTIFICATION_ICONS, NOTIFICATION_CLASSES } from '@/constants/notification';

const notification: Module<NotificationState, any> = {
  namespaced: true,
  state: ():NotificationState => ({
    notifications: [],
    timer: undefined,
  }),
  getters: {
    isEmpty(state): boolean {
      return !(state.notifications.length > 0);
    },
    currentNotification(state): Notification | null {
      return state.notifications[0] || null;
    },
    getType(state, getters): Notification['type'] | null  {
      return getters.currentNotification?.type || null;
    },
    getMsg(state, getters): string | null {
      return getters.currentNotification?.msg || null;
    },
    getDisappearTime(state, getters): number | null {
      return getters.currentNotification?.disappearTime || null;
    },
    getIcon(state, getters): string | null {
      const type = getters.getType;
      return type ? NOTIFICATION_ICONS[type] : null;
    },
    getClass(state, getters): string | null {
      const type = getters.getType;
      return type ? NOTIFICATION_CLASSES[type] : null;
    },
  },
  mutations: {
    addNotification(state, { type, msg, disappearTime = 10000 }: Notification) {
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
