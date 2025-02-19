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
