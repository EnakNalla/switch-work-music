import { toast } from 'react-toastify';
import { timerStub } from '../test-utils/stubs/playerStubs';
import ConfigStore from './configStore';

describe('ConfigStore', () => {
  let configStore: ConfigStore;

  beforeEach(() => {
    configStore = new ConfigStore();
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
});
