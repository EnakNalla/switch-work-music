import { makeAutoObservable } from 'mobx';
import { ChangeEvent } from 'react';

const DEFAULT_COLOURS = {
  primary: '#d92027',
  secondary: '#ff9234',
  tertiary: '#ffcd3c',
  quaternary: '#35d0ba',
  background: '#000000'
};

export default class ConfigStore {
  timers: Timer[] = [];
  useVisualiser = true;
  colours = DEFAULT_COLOURS;
  visualiserType: VisualiserTypes = 'cubes';
  visualiserStroke = 2;
  trackMissHits = true;

  constructor() {
    makeAutoObservable(this);
  }

  addTimer = (timer: Timer) => {
    if (this.timers.some(t => t.name === timer.name)) {
      throw new Error(`Timer ${timer.name} already exists`);
    }

    if (timer.default) {
      this.timers.find(t => t.default)!.default = false;
    }

    this.timers.push({ ...timer, playtime: timer.playtime * 1000 });
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

  setColour = (key: ColourKeys, colour: string) => {
    this.colours[key] = colour;
  };

  toggleUseVisualiser = () => (this.useVisualiser = !this.useVisualiser);

  setVisualiserType = (e: ChangeEvent<HTMLSelectElement>) => {
    this.visualiserType = e.target.value as VisualiserTypes;
  };

  setVisualiserStroke = (e: ChangeEvent<HTMLSelectElement>) => {
    this.visualiserStroke = parseInt(e.target.value);
  };

  resetColours = () => (this.colours = DEFAULT_COLOURS);
}
