import { render, screen } from '../test-utils/rtl';
import App from './App';

describe('<App />', () => {
  it('should render "Loading..."', () => {
    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render "Switch work Music"', () => {
    render(<App />, { loading: false, initData: jest.fn() });

    expect(screen.getByText('Switch work Music')).toBeInTheDocument();
  });
});
