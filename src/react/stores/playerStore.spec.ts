import { timerStub } from '../test-utils/stubs/playerStubs';
import PlayerStore from './playerStore';

describe('PlayerStore', () => {
  let playerStore: PlayerStore;

  beforeEach(() => {
    // @ts-ignore
    playerStore = new PlayerStore({ configStore: { timers: [timerStub()] } });
  });

  it('should set timer', () => {
    // @ts-ignore
    playerStore.setTimer({ target: { value: timerStub().name } });

    expect(playerStore.timer).toEqual(timerStub());
  });
});
