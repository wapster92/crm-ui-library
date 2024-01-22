import { defineStore } from 'pinia';
interface IState {
  height: number;
}

export const useHeaderHeightStore = defineStore('header-height', {
  state: (): IState => ({
    height: 0,
  }),
  actions: {
    setHeight(val: number) {
      this.height = val;
    },
  },
});
