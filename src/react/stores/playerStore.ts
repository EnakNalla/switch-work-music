import { makeAutoObservable, runInAction } from 'mobx';
import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import RootStore from './rootStore';

export default class PlayerStore {
  timer: Timer = { name: '30 seconds', playtime: 30000, default: true };
  songs: Song[] = [];
  song?: Song;
  shuffle = false;

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
}
