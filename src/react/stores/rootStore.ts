import { makeAutoObservable, runInAction } from 'mobx';
import PlayerStore from './playerStore';

export default class RootStore {
  loading = true;

  playerStore: PlayerStore;

  constructor() {
    this.playerStore = new PlayerStore();

    makeAutoObservable(this, { playerStore: false });
  }

  initData = async () => {
    const timers = await window.api.getTimers();

    runInAction(() => {
      this.playerStore.timers = timers;
      this.playerStore.timer = timers.find(t => t.default)!;

      this.loading = false;
    });
  };
}
