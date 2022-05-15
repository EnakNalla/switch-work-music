import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/rtl';
import { timerStub } from '../../../test-utils/stubs/playerStubs';
import TimerSelect from './TimerSelect';

describe('<TimerSelect />', () => {
  it('should call setTimer onChange', async () => {
    const playerStore = { timer: timerStub(), setTimer: jest.fn() };
    render(<TimerSelect />, {
      configStore: { timers: [timerStub(), { name: '30 seconds', playtime: 30, default: false }] },
      playerStore
    });

    await userEvent.selectOptions(screen.getByLabelText('Current timer'), '30 seconds');

    expect(playerStore.setTimer).toHaveBeenCalledTimes(1);
  });
});
