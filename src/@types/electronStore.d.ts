interface ElectronStore {
  timers: Timer[];
  configs: SavedConfig[];
}

interface SavedConfig {
  name: string;
  songs: Song[];
  config: {
    colours: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      background: string;
    };
    useVisualiser: boolean;
    visualiserType: VisualiserTypes;
    visualiserStroke: number;
    trackMissHits: boolean;
  };
}
