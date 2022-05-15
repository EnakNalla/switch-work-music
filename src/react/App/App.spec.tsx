import { render, screen } from '../test-utils/rtl';
import { timerStub } from '../test-utils/stubs/playerStubs';
import App from './App';

const fromElement = jest.fn();
jest.mock('@foobar404/wave', () => {
  return {
    default: class {
      constructor() {}

      fromElement = fromElement;
    }
  };
});

describe('<App />', () => {
  it('should render "Loading..."', () => {
    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render "Switch work Music"', () => {
    render(<App />, {
      loading: false,
      initData: jest.fn(),
      configStore: {
        timers: [],
        colours: {
          primary: '#d92027',
          secondary: '#ff9234',
          tertiary: '#ffcd3c',
          quaternary: '#35d0ba',
          background: '#000000'
        },
        useVisualiser: false,
        visualiserStroke: 2,
        visualiserType: 'bars'
      },
      playerStore: {
        timer: timerStub(),
        songs: [],
        setupPlayer: jest.fn(),
        missHits: {}
      }
    });

    expect(screen.getByText('Switch work Music')).toBeInTheDocument();
  });

  it('should hide main app', () => {
    render(<App />, {
      loading: false,
      initData: jest.fn(),
      configStore: {
        timers: [],
        colours: {
          primary: '#d92027',
          secondary: '#ff9234',
          tertiary: '#ffcd3c',
          quaternary: '#35d0ba',
          background: '#000000'
        }
      },
      playerStore: {
        timer: timerStub(),
        songs: [],
        setupPlayer: jest.fn(),
        visualiserActive: true,
        missHits: {}
      }
    });

    expect(screen.getByTestId('main').classList.contains('visually-hidden')).toBeTruthy();
  });
});
