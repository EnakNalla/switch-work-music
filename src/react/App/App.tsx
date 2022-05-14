import { Image } from 'react-bootstrap';
import styles from './App.module.scss';

const App = () => {
  return (
    <div id={styles.gridContainer} className="text-center">
      <div id={styles.config}>
        <h3>Config</h3>
      </div>

      <div id={styles.main} className="text-center">
        <h3>Switch work Music</h3>
        <Image src="/logo.png" alt="Jellybean switch" width={64} height={64} />
      </div>

      <div id={styles.playlist} className="text-center">
        <h3>Playlist</h3>
      </div>
    </div>
  );
};

export default App;
