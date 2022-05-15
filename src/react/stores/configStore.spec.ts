import { toast } from 'react-toastify';
import { timerStub } from '../test-utils/stubs/playerStubs';
import { savedConfigStub } from '../test-utils/stubs/SavedConfigStub';
import ConfigStore from './configStore';

describe('ConfigStore', () => {
  let configStore: ConfigStore;

  beforeEach(() => {
    // @ts-ignore
    configStore = new ConfigStore({ playerStore: { songs: [] } });
  });

  describe('addTimer', () => {
    it('should throw an error when timer exists', () => {
      jest.spyOn(toast, 'error');
      const timer = timerStub();
      configStore.timers = [timer];

      expect(() => configStore.addTimer(timer)).toThrowError(`Timer ${timer.name} already exists`);
    });

    it('should add a timer and ensure there is a single default', () => {
      const timer = { name: '30 seconds', playtime: 30, default: true };
      configStore.timers = [timer];
      const timer2 = timerStub();

      configStore.addTimer(timer2);

      expect(window.api.setTimers).toHaveBeenCalledWith([
        { ...timer, default: false },
        { ...timer2, playtime: 30000000 }
      ]);
    });
  });

  describe('removeTimer', () => {
    it('should remove timer and ensure there is a default', () => {
      const timer = timerStub();
      const timer2 = { name: '30 seconds', playtime: 30, default: false };
      configStore.timers = [timer, timer2];

      configStore.removeTimer(timer);

      expect(window.api.setTimers).toHaveBeenCalledWith([{ ...timer2, default: true }]);
    });
  });

  describe('changeDefaultTimer', () => {
    it('should change the default timer', () => {
      const timer = timerStub();
      const timer2 = { name: '30 seconds', playtime: 30, default: false };
      configStore.timers = [timer, timer2];

      configStore.changeDefaultTimer(timer2.name);

      expect(window.api.setTimers).toHaveBeenCalledWith([
        { ...timer, default: false },
        { ...timer2, default: true }
      ]);
    });
  });

  describe('setColour', () => {
    it('should update specified colour', () => {
      configStore.setColour('background', '#eaeaea');

      expect(configStore.colours.background).toBe('#eaeaea');
    });
  });

  describe('toggleUseVisualiser', () => {
    it('should set useVisualiser', () => {
      configStore.toggleUseVisualiser();

      expect(configStore.useVisualiser).toBeFalsy();
    });
  });

  describe('setVisualiserType', () => {
    it('should set visualiser type', () => {
      // @ts-ignore
      configStore.setVisualiserType({ target: { value: 'dualbars' } });

      expect(configStore.visualiserType).toBe('dualbars');
    });
  });

  describe('setVisualiserStroke', () => {
    it('should set visualiser stroke', () => {
      // @ts-ignore
      configStore.setVisualiserStroke({ target: { value: 10 } });

      expect(configStore.visualiserStroke).toBe(10);
    });
  });

  describe('resetColours', () => {
    it('should reset to DEFAULT_COLOURS', () => {
      // @ts-ignore
      configStore.colours = {};

      configStore.resetColours();

      expect(configStore.colours).toEqual({
        primary: '#d92027',
        secondary: '#ff9234',
        tertiary: '#ffcd3c',
        quaternary: '#35d0ba',
        background: '#000000'
      });
    });
  });

  describe('createConfig', () => {
    it('should call api.setConfigs', () => {
      configStore.createConfig({ name: 'test' });

      expect(window.api.setConfigs).toHaveBeenCalledTimes(1);
    });
    it('should throw error when config exists', () => {
      const config = savedConfigStub();
      jest.spyOn(toast, 'error');
      configStore.savedConfigs = [config];

      expect(() => configStore.createConfig({ name: config.name })).toThrowError(
        `Config ${config.name} already exists`
      );
    });

    it('should update config', () => {
      configStore.savedConfigs = [savedConfigStub()];

      configStore.createConfig({ name: savedConfigStub().name, update: true });

      expect(window.api.setConfigs).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteConfig', () => {
    it('should remove config from array', () => {
      configStore.savedConfigs = [savedConfigStub()];

      configStore.deleteConfig(savedConfigStub().name);

      expect(window.api.setConfigs).toHaveBeenCalledWith([]);
    });
  });

  describe('loadConfig', () => {
    it('should load config', () => {
      const config = savedConfigStub();
      configStore.loadConfig(config);

      expect(configStore.loadedConfig).toBe(config.name);
      expect(configStore.visualiserStroke).toBe(config.config.visualiserStroke);
    });
  });
});
