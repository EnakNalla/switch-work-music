import { toast } from 'react-toastify';
import { songStub, timerStub } from '../test-utils/stubs/playerStubs';
import PlayerStore from './playerStore';

const generateKbEvent = (code: string, nodeName = '') => ({
  code,
  target: { nodeName },
  preventDefault: jest.fn()
});

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('PlayerStore', () => {
  let playerStore: PlayerStore;

  beforeEach(() => {
    // @ts-ignore
    playerStore = new PlayerStore({ configStore: { timers: [timerStub()], useVisualiser: true } });
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

  describe('removeSong', () => {
    it('should remove song from songs array', () => {
      const song = songStub();
      playerStore.songs = [song];

      playerStore.removeSong(song.title);

      expect(playerStore.songs).toEqual([]);
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

  describe('toggleTrackMissHits', () => {
    it('should set shuffle to true', () => {
      playerStore.toggleTrackMissHits();

      expect(playerStore.trackMissHits).toBeFalsy();
    });
  });

  describe('validateKey', () => {
    it('should return false when nodeName === INPUT', () => {
      const kbEv = generateKbEvent('a', 'INPUT');

      // @ts-ignore
      const bool = playerStore.validateKey(kbEv);
      expect(bool).toBeFalsy();
    });

    it('should return true if code is one of valid codes', () => {
      const kbEv = generateKbEvent('Escape');

      // @ts-ignore
      const bool = playerStore.validateKey(kbEv);
      expect(bool).toBeTruthy();
    });

    it('should return false if code is not valid', () => {
      const kbEv = generateKbEvent('a');

      // @ts-ignore
      const bool = playerStore.validateKey(kbEv);
      expect(bool).toBeFalsy();
    });
  });

  describe('onKeyup', () => {
    it('should return if validateKey is false', () => {
      playerStore.song = songStub();
      const kbEv = generateKbEvent('a');

      // @ts-ignore
      playerStore.onKeyup(kbEv);
    });

    it('should call pause when key is "Escape"', () => {
      playerStore.song = songStub();

      const audioEl = {
        pause: jest.fn()
      };
      const kbEv = generateKbEvent('Escape');
      // @ts-ignore
      playerStore.player = audioEl;

      // @ts-ignore
      playerStore.onKeyup(kbEv);

      expect(audioEl.pause).toHaveBeenCalledTimes(1);
    });

    it('should call play when audioEl is paused', () => {
      playerStore.song = songStub();

      const audioEl = {
        paused: true,
        play: jest.fn()
      };
      const kbEv = generateKbEvent('Space');
      //@ts-ignore
      playerStore.player = audioEl;

      // @ts-ignore
      playerStore.onKeyup(kbEv);

      expect(audioEl.play).toHaveBeenCalledTimes(1);
    });

    it('when playing & playtime is 0 should call pause', () => {
      playerStore.song = songStub();

      playerStore.timer = { name: 'Indefinite', playtime: 0, default: true };
      const audioEl = {
        paused: false,
        pause: jest.fn()
      };
      const kbEv = generateKbEvent('Space');
      //@ts-ignore
      playerStore.player = audioEl;

      // @ts-ignore
      playerStore.onKeyup(kbEv);

      expect(audioEl.pause).toHaveBeenCalledTimes(1);
    });

    it('should add 1 to missHitCount when playing & playtime is not 0', () => {
      playerStore.song = songStub();

      const audioEl = {
        paused: false,
        play: jest.fn()
      };
      const kbEv = generateKbEvent('Space');
      //@ts-ignore
      playerStore.audioElement = audioEl;
      playerStore.timer = { name: '30 seconds', playtime: 30, default: true };

      // @ts-ignore
      playerStore.onKeyup(kbEv);

      expect(playerStore.missHitCount).toBe(1);
    });
  });

  describe('onPlay', () => {
    it('should not setTimeout if playtime is 0', () => {
      playerStore.timer = { name: 'Indefinite', playtime: 0, default: true };
      playerStore.onPlay();

      expect(setTimeout).not.toHaveBeenCalled();
    });

    it('should setTimeout', () => {
      playerStore.onPlay();

      expect(setTimeout).toHaveBeenCalledTimes(1);
    });

    it('should call player.pause after timeout', () => {
      const audioEl = {
        pause: jest.fn()
      };
      // @ts-ignore
      playerStore.player = audioEl;

      playerStore.onPlay();

      jest.runAllTimers();

      expect(audioEl.pause).toHaveBeenCalled();
    });
  });

  describe('onPause', () => {
    it('should set missHit', () => {
      const song = songStub();
      playerStore.song = song;
      playerStore.timer = { name: '30 seconds', playtime: 30, default: true };

      playerStore.onPause();

      expect(playerStore.missHits[song.title]).toEqual(['0 miss hits']);
    });

    it('should add to missHits if existing', () => {
      const song = songStub();
      playerStore.song = song;
      playerStore.timer = { name: '30 seconds', playtime: 30, default: true };
      playerStore.missHits[song.title] = ['0 miss hits'];
      playerStore.missHitCount++;

      playerStore.onPause();

      expect(playerStore.missHits[song.title]).toEqual(['0 miss hits', '1 miss hit']);
    });

    it('should return if playtime is 0', () => {
      playerStore.timer = { name: 'Indefinite', playtime: 0, default: true };
      playerStore.onPause();
    });
  });

  describe('onEnded', () => {
    const baseSong = songStub();
    beforeEach(() => {
      playerStore.songs = [baseSong];
      for (let i = 1; i <= 5; i++) {
        const song = songStub();
        song.title = `${song.title} ${i}`;
        playerStore.songs.push(song);
      }
    });

    it('should find the next song', () => {
      playerStore.song = baseSong;
      playerStore.onEnded();

      expect(playerStore.song).toEqual({ title: `${baseSong.title} 1`, path: baseSong.path });
    });

    it('should use 0 when song index is out of range', () => {
      playerStore.song = { title: `${baseSong.title} 5`, path: baseSong.path };

      playerStore.onEnded();
      expect(playerStore.song).toEqual(baseSong);
    });

    it('should choose a random song between 0 & songs.length when shuffle is true', () => {
      playerStore.shuffle = true;
      playerStore.song = baseSong;

      playerStore.onEnded();

      expect(playerStore.song).not.toEqual(baseSong);
    });

    it('should add 1 to index when shuffle selects the same index as current song', () => {
      playerStore.shuffle = true;
      playerStore.song = baseSong;
      jest.spyOn(Math, 'random').mockReturnValue(0);

      playerStore.onEnded();

      expect(playerStore.song).toEqual({ title: `${baseSong.title} 1`, path: baseSong.path });
    });
  });

  describe('onTimeUpdate', () => {
    it('should set currentTime to "00:10"', () => {
      const audioEl = {
        duration: '100',
        currentTime: '10'
      };

      // @ts-ignore
      playerStore.player = audioEl;

      playerStore.onTimeUpdate();

      expect(playerStore.currentTime).toBe('00:10');
    });
  });

  describe('onDurationChange', () => {
    it('should set duration to "01:40"', () => {
      const audioEl = {
        duration: '100',
        currentTime: '10'
      };

      // @ts-ignore
      playerStore.player = audioEl;

      playerStore.onDurationChange();

      expect(playerStore.duration).toBe('01:40');
    });
  });

  describe('setupPlayer', () => {
    it('should have no errors', () => {
      // @ts-ignore
      const cleanup = playerStore.setupPlayer({});

      cleanup();
    });
  });

  describe('resetMissHits', () => {
    it('should set missHits to empty object', () => {
      playerStore.missHits = {
        it: ['testing']
      };
      playerStore.resetMissHits();

      expect(playerStore.missHits).toEqual({});
    });
  });

  describe('saveMissHits', () => {
    it('should call api.saveMissHits', async () => {
      jest.spyOn(toast, 'success');
      await playerStore.saveMissHits('content');

      expect(window.api.saveMissHits).toHaveBeenCalled();

      expect(toast.success).toHaveBeenCalledWith('done');
    });

    it('should toast error from api.saveMissHits', async () => {
      jest.spyOn(toast, 'error');
      window.api.saveMissHits = jest.fn().mockReturnValue({ type: 'error', msg: 'done' });

      await playerStore.saveMissHits('content');

      expect(toast.error).toHaveBeenCalledWith('done');
    });
  });
});
