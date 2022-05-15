interface Timer {
  name: string;
  playtime: number;
  default: boolean;
}

interface Song {
  title: string;
  path: string;
}

interface MissHits {
  [key: string]: string[];
}

type VisualiserTypes =
  | 'cubes'
  | 'bars'
  | 'bars blocks'
  | 'dualbars'
  | 'dualbars blocks'
  | 'fireworks'
  | 'flower'
  | 'flower blocks'
  | 'orbs'
  | 'ring'
  | 'round wave'
  | 'shine'
  | 'shockwave'
  | 'star'
  | 'static'
  | 'stitches'
  | 'web'
  | 'wave';

type ColourKeys = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'background';
