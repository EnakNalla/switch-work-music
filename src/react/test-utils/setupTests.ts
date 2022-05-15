import '@testing-library/jest-dom';
import { songStub, timerStub } from './stubs/playerStubs';

window.api = {
  getTimers: jest.fn().mockResolvedValue([timerStub()]),
  setTimers: jest.fn(),

  selectSongs: jest.fn().mockResolvedValue([songStub()]),

  setFullscreen: jest.fn(),

  saveMissHits: jest.fn().mockResolvedValue({ type: 'success', msg: 'done' })
};
