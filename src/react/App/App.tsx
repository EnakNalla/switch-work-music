import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container, Image, Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AudioPlayer from '../components/Audio/AudioPlayer';
import Visualiser from '../components/Audio/Visualiser';
import Config from '../components/Config/Config';
import Playlist from '../components/Playlist/Playlist';
import { useStore } from '../stores/ProvideStore';
import styles from './App.module.scss';

const App = () => {
  const store = useStore();

  useEffect(() => {
    store.initData();
  }, []);

  if (store.loading) {
    return (
      <div className="d-flex align-items-center min-vh-100 justify-content-center">
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Container
        data-testid="main"
        fluid
        id={styles.gridContainer}
        className={store.playerStore.visualiserActive ? 'visually-hidden' : ''}
      >
        <div id={styles.config} className="text-center">
          <Config />
        </div>

        <div id={styles.main} className="text-center">
          <h3>Switch work Music</h3>
          <Image src="/logo.png" alt="Jellybean switch" width={64} height={64} />

          <AudioPlayer />
        </div>

        <div id={styles.playlist} className="text-center">
          <h3>Playlist</h3>
          <Playlist />
        </div>
        <ToastContainer position="bottom-right" />
      </Container>

      <Visualiser />
    </>
  );
};

export default observer(App);
