import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/rtl';
import { timerStub } from '../../../test-utils/stubs/playerStubs';
import TimerTable from './TimerTable';

describe('<TimerTable />', () => {
  it('should render timers', () => {
    render(<TimerTable />, {
      configStore: { timers: [timerStub(), { name: '30 seconds', playtime: 30, default: false }] }
    });

    expect(screen.getByText(timerStub().name)).toBeInTheDocument();
  });

  it('should open confirmModal and call removeTimer', async () => {
    const configStore = { timers: [timerStub()], removeTimer: jest.fn() };
    render(<TimerTable />, { configStore });

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await userEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(configStore.removeTimer).toHaveBeenCalledWith(timerStub());
  });

  it('should call changeDefaultTimer', async () => {
    const configStore = {
      timers: [{ ...timerStub(), default: false }],
      changeDefaultTimer: jest.fn()
    };
    render(<TimerTable />, { configStore });

    await userEvent.click(screen.getByRole('button', { name: 'False' }));

    expect(configStore.changeDefaultTimer).toHaveBeenCalledWith(timerStub().name);
  });
});
