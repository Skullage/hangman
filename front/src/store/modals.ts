import { markRaw } from "vue";

export type Modal = {
  isOpen: boolean;
  view: object;
  actions?: ModalAction[];
  props?: object;
};

export type ModalAction = {
  label: string;
  btnClass: string;
  callback: (props?: any) => void;
};

const modals = {
  namespaced: true,
  state: (): Modal => ({
    isOpen: false,
    view: {},
    actions: [],
    props: {},
  }),
  mutations: {
    open(state, { view, actions, props }: Modal) {
      state.isOpen = true;
      state.actions = actions;
      state.view = markRaw(view);
      state.props = props;
    },
    close(state) {
      state.isOpen = false;
      state.view = {};
      state.actions = [];
      state.props = {};
    },
  },
};

export default modals;
