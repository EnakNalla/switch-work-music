import { observer } from 'mobx-react-lite';
import { ReactNode, useRef } from 'react';
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { useStore } from '../../stores/ProvideStore';
import styles from './MissHits.module.scss';

const MissHits = () => {
  const { playerStore } = useStore();

  const missHitsContent = useRef<HTMLDivElement>(null);

  if (playerStore.timer.playtime === 0 || !playerStore.trackMissHits) return null;

  const missHits: ReactNode[] = [];
  Object.keys(playerStore.missHits).forEach((key, index) => {
    const list = playerStore.missHits[key];

    const listItems = list.map((item, index) => (
      <ListGroup.Item key={index} as="li">
        {item}
      </ListGroup.Item>
    ));

    missHits.push(
      <div key={index} className="mb-2">
        <h5>{key}</h5>
        <ListGroup as="ol" numbered>
          {listItems}
        </ListGroup>
      </div>
    );
  });

  return (
    <div className="m-2">
      <div className="d-flex justify-content-between">
        <h5 className="pt-2">Miss hits</h5>
        <ButtonGroup>
          <Button
            variant="success"
            onClick={() => playerStore.saveMissHits(missHitsContent.current!.innerText)}
          >
            Save
          </Button>
          <Button variant="warning" onClick={playerStore.resetMissHits}>
            Reset
          </Button>
        </ButtonGroup>
      </div>
      <div ref={missHitsContent} className="mt-2" id={styles.missHitContainer}>
        {missHits}
      </div>
    </div>
  );
};

export default observer(MissHits);
