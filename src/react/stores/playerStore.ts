import { makeAutoObservable, runInAction } from 'mobx';
import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import RootStore from './rootStore';

const VALID_KEYS = ['Escape', 'Enter', 'Space'];

export default class PlayerStore {
  timer: Timer = { name: '30 seconds', playtime: 30000, default: true };
  songs: Song[] = [];
  song?: Song;
  shuffle = false;

  player?: HTMLAudioElement;
  missHitCount = 0;
  missHits: MissHits = {};
  private timeout?: NodeJS.Timeout;
  currentTime = '00:00';
  duration = '00:00';
  visualiserActive = false;

  constructor(private root: RootStore) {
    makeAutoObservable(this);
  }

  setTimer = (e: ChangeEvent<HTMLSelectElement>) => {
    this.timer = this.root.configStore.timers.find(t => t.name === e.target.value)!;
  };

  selectSongs = async (newList: boolean) => {
    try {
      const songs = await window.api.selectSongs();

      runInAction(() => {
        this.songs = newList ? songs : this.songs.concat(songs);
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  toggleShuffle = () => (this.shuffle = !this.shuffle);

  setSong = (song: Song) => (this.song = song);

  setupPlayer = (player: HTMLAudioElement) => {
    this.player = player;

    document.addEventListener('keydown', this.validateKey);
    document.addEventListener('keyup', this.onKeyup);

    return () => {
      document.removeEventListener('keydown', this.validateKey);
      document.removeEventListener('keyup', this.onKeyup);
    };
  };

  validateKey = (e: KeyboardEvent) => {
    if ((e.target as HTMLElement).nodeName === 'INPUT') return false;

    if (VALID_KEYS.includes(e.code)) {
      e.preventDefault();
      return true;
    }

    return false;
  };

  onKeyup = (e: KeyboardEvent) => {
    if (!this.validateKey(e) || !this.song) return;

    if (e.code === 'Escape') {
      this.player?.pause();
      return;
    }

    if (this.player?.paused) {
      this.player.play();
      if (this.root.configStore.useVisualiser) {
        this.visualiserActive = true;
        window.api.setFullscreen(true);
      }
    } else {
      if (this.timer.playtime === 0) this.player?.pause();
      else this.missHitCount++;
    }
  };

  onPlay = () => {
    if (this.timer.playtime === 0) return;

    this.timeout = setTimeout(() => this.player?.pause(), this.timer.playtime);
  };

  onPause = () => {
    if (this.root.configStore.useVisualiser) {
      this.visualiserActive = false;
      window.api.setFullscreen(false);
    }
    clearTimeout(this.timeout!);

    if (this.timer.playtime === 0) return;

    const missHitText = this.missHitCount === 1 ? '1 miss hit' : `${this.missHitCount} miss hits`;
    const missHit = this.missHits[this.song!.title];
    if (missHit) missHit.push(missHitText);
    else this.missHits[this.song!.title] = [missHitText];

    this.missHitCount = 0;
  };

  onTimeUpdate = () => {
    this.currentTime = this.parseAudioTime(this.player!.currentTime);
  };

  onDurationChange = () => {
    this.duration = this.parseAudioTime(this.player!.duration);
  };

  onEnded = () => {
    clearTimeout(this.timeout!);

    let index = this.shuffle
      ? Math.floor(Math.random() * (this.songs.length + 1))
      : this.songs.findIndex(s => s.title === this.song!.title)! + 1;

    let nextSong = this.songs[index];
    if (nextSong && nextSong.title === this.song!.title) {
      nextSong = this.songs[index + 1];
    }

    this.song = nextSong ?? this.songs[0];
  };

  resetMissHits = () => (this.missHits = {});

  // saveMissHits = async (content: string) => {
  //   const res = await window.api.saveMissHits(
  //     this.root.configStore.loadedConfig ?? 'switch-work-music-miss-hits',
  //     content
  //   );
  //   if (res.type === 'error') toast.error(res.msg);
  //   else toast.success(res.msg);
  // };

  private parseAudioTime = (playtime: number) => {
    let m = (playtime / 60) % 60;
    let s = playtime % 60;
    m = parseInt(m.toString());
    s = parseInt(s.toString());

    return `${this.padWith0(m)}:${this.padWith0(s)}`;
  };

  private padWith0 = (playtime: number) => (playtime < 10 ? '0' + playtime : playtime);
}
