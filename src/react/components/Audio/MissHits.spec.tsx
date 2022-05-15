import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test-utils/rtl';
import MissHits from './MissHits';

describe('<MissHits />', () => {
  it('should render miss hits', () => {
    const playerStore = {
      trackMissHits: true,
      timer: { playtime: 30 },
      missHits: {
        test: ['1 miss hit']
      }
    };
    render(<MissHits />, { playerStore });

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should call saveMissHits', async () => {
    const playerStore = {
      trackMissHits: true,
      timer: { playtime: 30 },
      missHits: {
        test: ['1 miss hit']
      },
      saveMissHits: jest.fn()
    };
    render(<MissHits />, { playerStore });

    await userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(playerStore.saveMissHits).toHaveBeenCalledTimes(1);
  });

  it('should not render if !trackMissHits', () => {
    render(<MissHits />, { playerStore: { timer: { playtime: 30 }, trackMissHits: false } });

    expect(screen.queryByText('Miss hits')).not.toBeInTheDocument();
  });

  it('should not render if timer.playtime is 0', () => {
    render(<MissHits />, { playerStore: { timer: { playtime: 0 } } });

    expect(screen.queryByText('Miss hits')).not.toBeInTheDocument();
  });
});
