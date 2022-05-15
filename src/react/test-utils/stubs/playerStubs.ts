export const timerStub = (): Timer => ({
  name: 'timer stub',
  playtime: 30000,
  default: true
});

export const songStub = (): Song => ({
  title: 'song stub',
  path: 'file://song stub.mp3'
});
