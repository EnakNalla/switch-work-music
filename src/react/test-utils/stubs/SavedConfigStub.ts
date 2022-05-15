import { songStub } from './playerStubs';

export const savedConfigStub = (): SavedConfig => ({
  name: 'test config',
  songs: [songStub()],
  config: {
    colours: {
      primary: '#d92027',
      secondary: '#ff9234',
      tertiary: '#ffcd3c',
      quaternary: '#35d0ba',
      background: '#000000'
    },
    visualiserStroke: 6,
    useVisualiser: true,
    visualiserType: 'fireworks',
    trackMissHits: false
  }
});
