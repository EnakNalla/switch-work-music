import { timerStub } from '../test-utils/stubs/playerStubs';
import RootStore from './rootStore';

describe('RootStore', () => {
  let rootStore: RootStore;

  beforeEach(() => {
    rootStore = new RootStore();
  });

  describe('initData', () => {
    it('should call api.getTimers', async () => {
      const timer = timerStub();

      await rootStore.initData();

      expect(rootStore.configStore.timers).toEqual([timer]);
      expect(rootStore.playerStore.timer).toEqual(timer);
    });
  });
});
