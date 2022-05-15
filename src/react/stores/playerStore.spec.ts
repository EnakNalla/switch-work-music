import { toast } from 'react-toastify';
import { songStub, timerStub } from '../test-utils/stubs/playerStubs';
import PlayerStore from './playerStore';

describe('PlayerStore', () => {
  let playerStore: PlayerStore;

  beforeEach(() => {
    // @ts-ignore
    playerStore = new PlayerStore({ configStore: { timers: [timerStub()] } });
  });

  describe('setTimer', () => {
    it('should set timer', () => {
      // @ts-ignore
      playerStore.setTimer({ target: { value: timerStub().name } });

      expect(playerStore.timer).toEqual(timerStub());
    });
  });

  describe('selectSongs', () => {
    it('should set songs as the returned list', async () => {
      await playerStore.selectSongs(true);

      expect(playerStore.songs).toEqual([songStub()]);
    });

    it('should add songs from the returned list', async () => {
      const song: Song = { title: 'a song', path: 'the path' };
      playerStore.songs = [song];

      await playerStore.selectSongs(false);

      expect(playerStore.songs).toEqual([song, songStub()]);
    });

    it('should toast error from api.selectSongs', async () => {
      jest.spyOn(toast, 'error');
      window.api.selectSongs = jest.fn().mockRejectedValue(new Error('test error'));

      await playerStore.selectSongs(true);

      expect(toast.error).toHaveBeenCalledWith('test error');
    });
  });

  describe('setSong', () => {
    it('should set song from value', () => {
      playerStore.setSong(songStub());

      expect(playerStore.song).toEqual(songStub());
    });
  });

  describe('toggleShuffle', () => {
    it('should set shuffle to true', () => {
      playerStore.toggleShuffle();

      expect(playerStore.shuffle).toBeTruthy();
    });
  });
});
