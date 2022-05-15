import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test-utils/rtl';
import { songStub } from '../../test-utils/stubs/playerStubs';
import Playlist from './Playlist';

describe('<Playlist />', () => {
  it('should call selectSongs with true', async () => {
    const playerStore = { songs: [], selectSongs: jest.fn() };
    render(<Playlist />, { playerStore });

    await userEvent.click(screen.getByRole('button', { name: 'New playlist' }));

    expect(playerStore.selectSongs).toHaveBeenCalledWith(true);
  });

  it('should call selectSongs with false', async () => {
    const playerStore = { songs: [], selectSongs: jest.fn() };
    render(<Playlist />, { playerStore });

    await userEvent.click(screen.getByRole('button', { name: 'Add songs' }));

    expect(playerStore.selectSongs).toHaveBeenCalledWith(false);
  });

  it('should render songs and set gray bg on active song', () => {
    const playerStore = { songs: [songStub()], song: songStub() };
    render(<Playlist />, { playerStore });

    expect(screen.getByText(songStub().title).classList).not.toBeUndefined();
  });

  it('should call setSong onClick', async () => {
    const playerStore = { songs: [songStub()], setSong: jest.fn() };
    render(<Playlist />, { playerStore });

    await userEvent.click(screen.getByText(songStub().title));

    expect(playerStore.setSong).toHaveBeenCalledWith(songStub());
  });
});
