import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';

export default class ConfigStore {
  timers: Timer[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTimer = (timer: Timer) => {
    if (this.timers.some(t => t.name === timer.name)) {
      toast.error(`Timer ${timer.name} already exists`);
      return;
    }

    if (timer.default) {
      this.timers.find(t => t.default)!.default = false;
    }

    this.timers.push(timer);
    this.saveTimers();
  };

  removeTimer = (timer: Timer) => {
    if (timer.default) {
      this.timers.find(t => t.name === '30 seconds')!.default = true;
    }

    const index = this.timers.findIndex(t => t.name === timer.name);
    this.timers.splice(index, 1);

    this.saveTimers();
  };

  changeDefaultTimer = (name: string) => {
    this.timers.find(t => t.default)!.default = false;
    this.timers.find(t => t.name === name)!.default = true;

    this.saveTimers();
  };

  private saveTimers = () => {
    window.api.setTimers(JSON.parse(JSON.stringify(this.timers)));
  };
}
