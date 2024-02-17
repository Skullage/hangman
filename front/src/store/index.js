import { createStore } from "vuex";
import theme from "./theme.js";
import room from "./room.js";
import notification from "./notification.js";
import user from "./user.js";
import modals from "./modals.js";
import hangman from "./hangman.js";
import chat from "./chat.js";

const store = createStore({
  modules: {
    theme,
    room,
    notification,
    user,
    modals,
    hangman,
    chat,
  },
});

export default store;
