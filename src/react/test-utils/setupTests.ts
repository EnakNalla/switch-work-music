import '@testing-library/jest-dom';
import { timerStub } from './stubs/playerStubs';

window.api = {
  getTimers: jest.fn().mockResolvedValue([timerStub()]),
  setTimers: jest.fn()
};
