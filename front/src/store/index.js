import { createStore } from "vuex";
import theme from "./theme.js";
import room from "./room.js";
import notification from "./notification.js";
import user from "./user.js";
import hangman from "./hangman.js";
import chat from "./chat.js";
import modals from "./modals.ts";

const store = createStore({
  modules: {
    theme,
    room,
    notification,
    user,
    hangman,
    chat,
    modals,
  },
});

export default store;
