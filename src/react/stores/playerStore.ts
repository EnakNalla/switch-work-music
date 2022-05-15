import { makeAutoObservable } from 'mobx';
import { ChangeEvent } from 'react';
import RootStore from './rootStore';

export default class PlayerStore {
  timer: Timer = { name: '30 seconds', playtime: 30000, default: true };

  constructor(private root: RootStore) {
    makeAutoObservable(this);
  }

  setTimer = (e: ChangeEvent<HTMLSelectElement>) => {
    this.timer = this.root.configStore.timers.find(t => t.name === e.target.value)!;
  };
}
