import { makeAutoObservable, runInAction } from 'mobx';
import ConfigStore from './configStore';
import PlayerStore from './playerStore';

export default class RootStore {
  loading = true;

  playerStore: PlayerStore;
  configStore: ConfigStore;

  constructor() {
    this.playerStore = new PlayerStore();
    this.configStore = new ConfigStore();

    makeAutoObservable(this, { playerStore: false });
  }

  initData = async () => {
    const timers = await window.api.getTimers();

    runInAction(() => {
      this.configStore.timers = timers;
      this.playerStore.timer = timers.find(t => t.default)!;

      this.loading = false;
    });
  };
}
