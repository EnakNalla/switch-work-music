import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('should render "Switch work Music"', () => {
    render(<App />);

    expect(screen.getByText('Switch work Music')).toBeInTheDocument();
  });
});
