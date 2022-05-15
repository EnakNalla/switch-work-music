import { makeAutoObservable } from 'mobx';
import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import RootStore from './rootStore';

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

  savedConfigs: SavedConfig[] = [];
  loadedConfig?: string;

  constructor(private root: RootStore) {
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

  loadConfig = (config: SavedConfig) => {
    this.loadedConfig = config.name;

    this.root.playerStore.songs = config.songs;
    this.root.playerStore.song = config.songs[0];

    this.colours = config.config.colours;
    this.useVisualiser = config.config.useVisualiser;
    this.trackMissHits = config.config.trackMissHits;
    this.visualiserStroke = config.config.visualiserStroke;
    this.visualiserType = config.config.visualiserType;
  };

  createConfig = ({ name, update }: { name: string; update?: boolean }) => {
    if (!update) {
      if (this.savedConfigs.some(c => c.name === name)) {
        throw new Error(`Config ${name} already exists`);
      }
      this.savedConfigs.push(this.generateConfig(name));
    } else {
      const generatedConfig = this.generateConfig(name);
      const config = this.savedConfigs.find(c => c.name === name)!;
      config.config = generatedConfig.config;
      config.songs = generatedConfig.songs;
    }

    window.api.setConfigs(JSON.parse(JSON.stringify(this.savedConfigs)));
    toast.success(`Config ${name} ${update ? 'updated' : 'created'}`);
  };

  deleteConfig = (name: string) => {
    const index = this.savedConfigs.findIndex(c => c.name === name);
    this.savedConfigs.splice(index, 1);

    window.api.setConfigs(JSON.parse(JSON.stringify(this.savedConfigs)));
  };

  private generateConfig = (name: string): SavedConfig => ({
    name,
    songs: this.root.playerStore.songs,
    config: {
      colours: this.colours,
      useVisualiser: this.useVisualiser,
      trackMissHits: this.trackMissHits,
      visualiserStroke: this.visualiserStroke,
      visualiserType: this.visualiserType
    }
  });
}
