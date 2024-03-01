import { markRaw } from "vue";

export type Modal = {
  isOpen: boolean;
  view: object;
  actions?: ModalAction[];
};

export type ModalAction = {
  label: string;
  callback: (props?: any) => void;
};

const newModal = {
  namespaced: true,
  state: (): Modal => ({
    isOpen: false,
    view: {},
    actions: [],
  }),
  mutations: {
    open(state, { view, actions }: Modal) {
      state.isOpen = true;
      state.actions = actions;
      state.view = markRaw(view);
    },
    close(state) {
      state.isOpen = false;
      state.view = {};
      state.actions = [];
    },
  },
};

export default newModal;
