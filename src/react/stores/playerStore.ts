import { makeAutoObservable } from 'mobx';

export default class PlayerStore {
  timers: Timer[] = [];
  timer: Timer = { name: '30 seconds', playtime: 30000, default: true };

  constructor() {
    makeAutoObservable(this);
  }
}
