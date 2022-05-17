import { observer } from 'mobx-react-lite';
import { Button, ButtonGroup, FormCheck, Table } from 'react-bootstrap';
import { useStore } from '../../stores/ProvideStore';
import styles from './Playlist.module.scss';

const Playlist = () => {
  const { playerStore } = useStore();

  return (
    <>
      <div className="d-flex justify-content-between">
        <ButtonGroup>
          <Button variant="success" onClick={() => playerStore.selectSongs(true)}>
            New playlist
          </Button>
          <Button onClick={() => playerStore.selectSongs(false)}>Add songs</Button>
        </ButtonGroup>

        <FormCheck
          className="pt-2"
          type="switch"
          checked={playerStore.shuffle}
          onChange={playerStore.toggleShuffle}
          label="Shuffle"
          id="shuffle"
        />
      </div>

      <div id={styles.playlistContainer}>
        <Table bordered className="bg-white mt-2" hover id={styles.playlist}>
          <tbody>
            {playerStore.songs.map((s, i) => (
              <tr
                key={i}
                className={playerStore.song?.title === s.title ? styles.active : undefined}
                onClick={() => playerStore.setSong(s)}
              >
                <td>{s.title}</td>
                <td>
                  <Button variant="danger" onClick={() => playerStore.removeSong(s.title)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default observer(Playlist);
