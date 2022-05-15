import { render, screen } from '../test-utils/rtl';
import { timerStub } from '../test-utils/stubs/playerStubs';
import App from './App';

describe('<App />', () => {
  it('should render "Loading..."', () => {
    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render "Switch work Music"', () => {
    render(<App />, {
      loading: false,
      initData: jest.fn(),
      configStore: { timers: [] },
      playerStore: { timer: timerStub() }
    });

    expect(screen.getByText('Switch work Music')).toBeInTheDocument();
  });
});
